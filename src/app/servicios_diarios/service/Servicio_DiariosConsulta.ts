import { Response } from "express";
import { Sql_ServiciosDiarios } from "../repository/Sql_ServiciosDiarios";
import pool from "../../../config/connection/dbConnetions";


class Servicios_DiariosConsulta{
    protected static async ConsultaDiarios(res:Response):Promise<any>{
        await pool.result(Sql_ServiciosDiarios.FIND_ALL).
        then((misdatos)=>{
            res.status(200).json(misdatos.rows)
        }).catch((mierror)=>{
<<<<<<< HEAD
            console.log(mierror);
=======
>>>>>>> 62f9d91 (Cambios realizados)
            res.status(400).json({respuesta:"Coño e la madre"})
        });
    }
}

export default Servicios_DiariosConsulta;

