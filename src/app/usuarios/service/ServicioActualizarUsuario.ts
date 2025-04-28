import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { sql_usuarios } from "../repository/Sql_Usuario";
import Usuario from "../model/Usuario";

class ServicicioActualizarUsuario {
    protected static async ActualizarUsuario(obj:Usuario,res:Response):Promise<any>{

        await pool.task(async(consulta)=>{
            let caso=1;
            let objActualizado:any;
            const usuario= await consulta.one(sql_usuarios.HOW_MANY,[obj.codUsuario]);
            if (usuario.cantidad){
                caso=2;
                objActualizado= await consulta.one(sql_usuarios.UPDATE,[obj.codRol,obj.documentoUsuario,obj.nombresUsuario,obj.apellidosUsuario,obj.generoUsuario,obj.fechaNacimientoUsuario,obj.telefonoUsuario]);

            } 
            return {caso,objActualizado}
        }).then(({caso,objActualizado})=>{
            switch (caso) {
                case 1:
                    res.status(400).json({respuesta:"Vale mia eso ya esta"})
                    break;
            
                default:
                    res.status(200).json({objActualizado})
                    break;
            }
        }).catch((mierror)=>{
            console.log("Error en la base de datos", mierror);
            res.status(400).json("No sirve");
        });

        }




    }


export default ServicicioActualizarUsuario;