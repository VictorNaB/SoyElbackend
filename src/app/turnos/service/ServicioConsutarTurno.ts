import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { sql_Turnos } from "../repository/Sql_Turnos";

class ServicioConsultarTurno{
    public static async ConsultarTurno(res:Response):Promise<any>{
        await pool.result(sql_Turnos.FIND_ALL).then((misdatos)=>{
            res.status(200).json(misdatos.rows)
        }).catch((mierror)=>{
            console.log(mierror);
            res.status(400).json({respuesta:"Error en la base de datos"});

        });
    }

}

export default ServicioConsultarTurno;