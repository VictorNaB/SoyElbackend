import { json, Response } from "express";
import Ser_Diarios from "../model/Ser_Diarios";
import pool from "../../../config/connection/dbConnetions";
import { Sql_ServiciosDiarios } from "../repository/Sql_ServiciosDiarios";


class ServicioActualizarServiciosDiarios{
    protected static async Actualizar(obj:Ser_Diarios,res:Response):Promise<any>{
        await pool.task(async(consulta)=>{
            let caso=1;
            let objCre:any;
            const ServicioDiario= await consulta.one(Sql_ServiciosDiarios.HOW_MANY,[obj.CodServicioDiarios]);
            if (ServicioDiario.cantidad) {
                caso=2;
                objCre= await consulta.result(Sql_ServiciosDiarios.UPDATE,[obj.CodServicioDiarios,obj.CodParqueadero,obj.CodVehiculo,obj.CodPuesto,obj.FechaInicio,obj.FechaFin,obj.ValorDiario]);

            }
            return {caso,objCre};

        }).then(({caso,objCre})=>{
            switch (caso) {
                case 1:
                    res.status(400).json({respuesta:"Vale mia eso ya esta"})
                    break;
            
                default:
                    res.status(200).json({objCre});
                    break;
            }



        }).catch((mierror)=>{
            console.log(mierror);
            res.status(400).json({respuesta:"Mano eso no sirvio"})

        });
    }

}

export default ServicioActualizarServiciosDiarios;