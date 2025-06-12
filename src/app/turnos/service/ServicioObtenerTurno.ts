import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { SQL_TURNO } from "../repository/sql_turno";


class ServicioObtenerTurno{
    protected static async ObtenerTurno(res:Response):Promise<any>{
        await pool.result(SQL_TURNO.FIND_ALL).
        then((midatos)=>{
            res.status(200).json(midatos.rows)
        }).catch((mierror)=>{
            console.log(mierror);
            res.status(400).json({respuesta:"Coño e la madre"})

        });
    }
}

export default ServicioObtenerTurno;    