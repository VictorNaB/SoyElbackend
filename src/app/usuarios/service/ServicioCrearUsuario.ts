import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { sql_usuarios } from "../repository/Sql_Usuario";
import Usuario from "../model/Usuario";

class ServicioCrearUsuario {
    protected static async CrearUsuario(obj:Usuario,res:Response):Promise<any>{

        await pool.task(async(consulta)=>{
            let caso=1;
            let objCreado:any;
<<<<<<< HEAD
            const usuariodocumento=await consulta.oneOrNone(sql_usuarios.FIND_BY_DOCUMENTO,[obj.documentoUsuario]);

            if(usuariodocumento){
                caso=3;
            }
=======
>>>>>>> 62f9d91 (Cambios realizados)
            const usuario= await consulta.one(sql_usuarios.HOW_MANY,[obj.codUsuario]);
            if (usuario.cantidad==0){
                caso=2;
                objCreado= await consulta.one(sql_usuarios.ADD,[obj.codRol,obj.documentoUsuario,obj.nombresUsuario,obj.apellidosUsuario,obj.generoUsuario,obj.fechaNacimientoUsuario,obj.telefonoUsuario]);

<<<<<<< HEAD
            }

=======
            } 
>>>>>>> 62f9d91 (Cambios realizados)
            return {caso, objCreado}
        }).then(({caso,objCreado})=>{
            switch (caso) {
                case 1:
                    res.status(400).json({respuesta:"Vale mia eso ya esta"})
                    break;
<<<<<<< HEAD
                case 2:
                    res.status(200).json({objCreado});
                    break;
                case 3:
                    res.status(400).json({respuesta:"Ya existe un usuario con ese documento"});
                    break;
                default:
=======
            
                default:
                    res.status(200).json({objCreado})
>>>>>>> 62f9d91 (Cambios realizados)
                    break;
            }
        }).catch((mierror)=>{
            console.log("Error en la base de datos", mierror);
            res.status(400).json("No sirve");
        });

        }




    }


export default ServicioCrearUsuario;