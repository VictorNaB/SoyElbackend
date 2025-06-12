import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { sql_rel_turno_usuario } from "../repository/Sql_Turno_Usuario";


class ServicioObtenerRelTurnoUsuario {
    protected static async ObtenerRelTurnoUsuario(res: Response): Promise<any> {
        await pool.result(sql_rel_turno_usuario.FIND_ALL).then((misdatos)=>{
            res.status(200).json(misdatos.rows);
        }).catch((mierror)=>{
            console.log(mierror);
            res.status(400).json({respuesta:"Conoces A yaper? Bueno ya perdiste"});
        })
    }
}

export default ServicioObtenerRelTurnoUsuario;