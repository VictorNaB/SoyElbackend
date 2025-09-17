import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { sql_Accesos } from "../repository/Sql_Accesos";

class ServicioConsultarAccesos {
    protected static async ConsultaAccesos(res: Response):Promise<any>{
        await pool
        .result(sql_Accesos.GETALL)
        .then((misdatos)=>{
            res.status(200).json(misdatos.rows);
        }).catch((Error)=>{

            console.log(Error);

            res
              .status(400)
              .json({
                Respuesta: "Error al obtener los accesos",
                result: Error,
              });
        });
    }
}

export default ServicioConsultarAccesos;

