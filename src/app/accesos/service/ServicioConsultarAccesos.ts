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
<<<<<<< HEAD
            console.log(Error);
=======
>>>>>>> 62f9d91 (Cambios realizados)
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
