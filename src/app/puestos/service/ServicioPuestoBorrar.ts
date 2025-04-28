import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import Puesto from "../model/Puesto";
import { sql_puesto } from "../repository/Sql_Puesto";
import { Sql_ServiciosDiarios } from "../../servicios_diarios/repository/Sql_ServiciosDiarios";

class ServicioPuestoBorrar{

    protected static async borrar(obj:Puesto, res:Response):Promise<any>{
        await pool.task(async(consulta)=>{
            let caso=0;
            let objeliminado:any;
            
            const puesto = await consulta.one(sql_puesto.FIND_BY,[obj.codPuesto]);
            const servidiariorelacionado= await consulta.any(Sql_ServiciosDiarios.FIND_BY_PUESTO,[obj.codPuesto]);
            if(puesto==null){
               caso=1;
            }
            
            if(servidiariorelacionado){
                caso=2;
            }
            objeliminado= await consulta.one(sql_puesto.DELETE,[obj.codPuesto]);
            if(objeliminado.rowCount>0){
                caso=3;
            }else{
                caso=4;
            
            }

            return {caso,objeliminado}
            
        }).then(({caso,objeliminado})=>{
           switch (caso) {
            case 1:
                res.status(400).json({respuesta:"El puesto no existe"});
                break;
            case 2:
                res.status(400).json({respuesta:"El puesto tiene un servicio diario relacionado"});
                break

            case 3:
                res.status(200).json({respuesta:"Se elimino Correctamente", "filas borradas":objeliminado.rowCount,});
                break;
            case 4:
                res.status(400).json({respuesta:"No se pudo eliminar"});
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

export default ServicioPuestoBorrar;
