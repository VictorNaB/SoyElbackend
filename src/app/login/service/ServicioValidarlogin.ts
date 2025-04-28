import { Response, Request } from "express";
import pool from "../../../config/connection/dbConnetions";
import Login from "../model/Login";
import { sql_login } from "../repository/Sql_Login";
import { sql_usuarios } from "../../usuarios/repository/Sql_Usuario";
import cifrar,{ compare } from "bcryptjs";
import InfoToken from "../model/InfoToken";
import { Sql_ingresos } from "../../ingresos/repository/Sql_Ingresos";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { sql_Accesos } from "../../accesos/repository/Sql_Accesos";


dotenv.config({path: "Variables.env"}); 

class ServicioValidarlogin{

    protected static async Validar(obj:Login, res:Response):Promise<any>{
        await pool.task(async(consulta)=>{
            let caso=1;
            let objvalidado:any;
            let datosusuario:any;
            let token:any;
            
            const clavecifrada=cifrar.hashSync(obj.claveAcceso);
            console.log("Clave cifrada:", clavecifrada)
            //Verificamos si el usuario existe
            const usuario = await consulta.oneOrNone(sql_login.VALIDATE, [obj.correoAcceso]);
            console.log("Usuario encontrado:", usuario);
            console.log("Contraseña base de datos", usuario.claveAcceso);
            console.log("Contraseña cifrada", clavecifrada);
            console.log("Contraseña front", obj.claveAcceso);

            const claveCorrecta= cifrar.compareSync(obj.claveAcceso, usuario.claveAcceso);
            console.log("Contraseña correcta:", claveCorrecta);

            if(!usuario || !claveCorrecta){
                caso = 3;
            
            } 
            const codUsuario=usuario.codUsuario;
            // Obtiene los datos de acceso del usuario.
            const acceso= await consulta.oneOrNone(sql_login.GETBYID,[codUsuario]);

            //Verifica si el acceso del usuario es nulo
            if(!acceso){
                caso=2;
            }

            if(claveCorrecta){
                caso=4;
                // Actualizar UUID para nueva sesión
                const nuevoUUID = uuidv4();
                await consulta.result(sql_Accesos.UPDATE_UUID, [nuevoUUID, codUsuario]);

                // Registra el inicio de sesión en la tabla ingresos.
                objvalidado= await consulta.one(Sql_ingresos.REGISTER_LOGIN,[codUsuario]);

                // Obtiene los datos del usuario.
                datosusuario= await consulta.one(sql_usuarios.FIND_ALL,[codUsuario]) as InfoToken;


                const secret = process.env.JWT_SECRET as string;
                token = jwt.sign(datosusuario, secret, { expiresIn: "1m" });

            }

            return {caso, objvalidado,datosusuario, token}
            
        }).then(({caso, objvalidado,datosusuario, token})=>{
            switch (caso) {
                case 2:
                    res.status(400).json({respuesta:"El usuario no tiene acceso"});
                    break;
                case 3:
                    res.status(401).json({respuesta:"El usuario no existe"})
                    break;
                case 4:
                    res.status(200).json({respuesta: "inicio de sesion exitoso",
                        usuario: datosusuario,
                        sesion: {
                            codIngreso: objvalidado.codingreso,
                            fechaIngreso: objvalidado.fechaingreso,
                            horaIngreso: objvalidado.horaingreso,
                        },
                        token});
                    break;
                default:
                    break;
            }
        }).catch((mierror)=>{
            console.log(mierror);
            res.status(400).json({respuesta:"Eso no sirve"})
        });
    }

    

}

export default ServicioValidarlogin;