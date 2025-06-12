import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { sql_rel_turno_usuario } from "../repository/Sql_Rel_Turno_Usuario";

class ServicioConsultarTurnoUsuario{
    protected static async consultarTurnoUsuario(res:Response):Promise<any>{
        await pool.result(sql_rel_turno_usuario.FIND_ALL).
        then((misdatos)=>{
            res.status(200).json(misdatos.rows);
        }).catch((mierror)=>{
            console.log(mierror);
            return {respuesta:"No sirve"};
        });   
    }
}

export default ServicioConsultarTurnoUsuario;
