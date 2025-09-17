import { Response } from "express";
import { json, Response } from "express";
import Ser_Diarios from "../model/Ser_Diarios";
import pool from "../../../config/connection/dbConnetions";
import { Sql_ServiciosDiarios } from "../repository/Sql_ServiciosDiarios";

class ServicioEliminarServicioDiarios{
    protected static async eliminar(obj:Ser_Diarios, res:Response):Promise<any>{
        await pool.task((consulta)=>{
            return consulta.result(Sql_ServiciosDiarios.DELETE,[obj.CodServicioDiarios]);
        }).then((respuesta)=>{
            res.status(200).json({respuesta:"Se elimino Correctamente", "filas borradas":respuesta.rowCount,})
        }).catch((mierror)=>{
            console.log(mierror);
            res.status(400).json({respuesta:"Tu porqueria no sirve"})

        });

        await pool.task(async(consulta)=>{

            let caso=0;
            let Objeliminado:any;
            const existe=await consulta.oneOrNone(Sql_ServiciosDiarios.FIND_BY,(obj.CodServicioDiarios));
           
            if(!existe){
                caso=1;
            }
            
            if(existe){
                caso=2;
                Objeliminado=await consulta.result(Sql_ServiciosDiarios.DELETE,[obj.CodServicioDiarios]);
            }

            return{caso,Objeliminado};
           
        }).then(({caso,Objeliminado})=>{
            switch (caso) {
                case 1:
                    res.status(400).json({respuesta:"El servicio diario no existe"});
                    break;
                case 2:
                    res.status(200).json({respuesta:"Se elimino Correctamente","filas borradas":Objeliminado.rowCount,})
                    break;
            
                default:
                    break;
            }
        }).catch((mierror)=>{
            console.error("Error al eliminar el servicio diario:", mierror);
            res.status(400).json({respuesta:"Tu porqueria no sirve"})
        });
    }
}


export default ServicioEliminarServicioDiarios;
