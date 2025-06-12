import { Response } from "express";
import Relacion_Turno_Usuario from "../model/Rel_Turno_Usuario";
import pool from "../../../config/connection/dbConnetions";
import { sql_rel_turno_usuario } from "../repository/Sql_Turno_Usuario";


class ServicioEliminarTurnoUsuario{
    protected static async EliminarTurnoUsuario(obj:Relacion_Turno_Usuario, res:Response):Promise<any>{
        await pool.task(async(consulta)=>{
            return consulta.result(sql_rel_turno_usuario.DELETE,[obj.CodTurnoUsuario]);
        }).then((respuesta)=>{
            res.status(200).json({respuesta:"Se elimino Correctamente", "filas borradas":respuesta.rowCount,})
        }).catch((mierror)=>{
            console.log(mierror);
            res.status(400).json({respuesta:"Eso no sirve"})
        });
    }
} 

export default ServicioEliminarTurnoUsuario;