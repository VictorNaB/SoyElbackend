import { Response } from "express";
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

    }
}

export default ServicioEliminarServicioDiarios;