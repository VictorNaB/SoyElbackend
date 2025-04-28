import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import Rol from "../model/Rol";
import { sql_roles } from "../repository/Sql_rol";

class ServicioRolActualizar{


    protected static async actualizarRol(objRol:Rol, res:Response):Promise<any>{
        await pool.task(async (consulta)=>{
            let caso=1;
            let objActualizado:any;
            const roles= await consulta.one(sql_roles.HOW_MANY, [objRol.nombreRol]);
            if(roles.cantidad==0){
                caso=2;
                objActualizado=await consulta.result(sql_roles.UPDATE,[objRol.nombreRol, objRol.codRol]);
                
            }
            return {caso, objActualizado};

        }).then(({caso, objActualizado})=>{
            switch (caso) {
                case 1:
                    res.status(400).json({respuesta:"Ya existe el rol mano"});
                    break;
            
                default:
                    res.status(200).json({respuesta:"Todo bien", detalle:objActualizado.rowCount,});
                    break;
            }
        }).catch((miError:any)=>{
            console.log(miError)
            res.status(400).json({respuesta:"Fatal error!!!"})
        });
    }

}

export default ServicioRolActualizar;