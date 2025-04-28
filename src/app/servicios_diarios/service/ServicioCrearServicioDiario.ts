import { Response } from "express";
import Ser_Diarios from "../model/Ser_Diarios"
import pool from "../../../config/connection/dbConnetions";
import { Sql_ServiciosDiarios } from "../repository/Sql_ServiciosDiarios";

class ServicioCrearServicioDiarios{
    protected static async CrearServicio_Diario(obj:Ser_Diarios,res:Response):Promise<any>{
        await pool.task(async(consulta)=>{

            let caso=1;
            let objCreado:any;
            const ServicioDiario= await consulta.one(Sql_ServiciosDiarios.HOW_MANY, [obj.CodServicioDiarios]);
            if(ServicioDiario.cantidad==0){
                caso=2;
                objCreado= await consulta.one(Sql_ServiciosDiarios.ADD,[obj.CodParqueadero,obj.CodVehiculo,obj.CodPuesto,obj.FechaInicio,obj.FechaFin,obj.ValorDiario]);

            }
            return {caso, objCreado}
        }).then(({caso,objCreado})=>{
            switch (caso) {
                case 1:
                    res.status(400).json({respuesta:"Vale mia eso ya esta"})
                    break;
            
                default:
                    res.status(200).json({objCreado})
                    break;
            }
        }).catch((mierror)=>{
            console.log();
            res.status(400).json({respuesta:"Joaa"})

        });

    }
}

export default ServicioCrearServicioDiarios;