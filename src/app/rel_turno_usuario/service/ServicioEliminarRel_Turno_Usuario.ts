import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import rel_turno_usuario from "../model/Rel_Turno_Usuario";
import { sql_rel_turno_usuario } from "../repository/Sql_Rel_Turno_Usuario";


class ServicioEliminarRel_Turno_Usuario{
    protected static async EliminarTurnoUsuario(obj:rel_turno_usuario, res:Response):Promise<any>{
        await pool.task((consulta)=>{
            return consulta.result(sql_rel_turno_usuario.DELETE,[obj.CodTurnoUsuario]);
        }).then((respuesta)=>{
            res.status(200).json({respuesta:"Se elimino Correctamente", "filas borradas":respuesta.rowCount,})
        }).catch((mierror)=>{
            console.log(mierror);
            res.status(400).json({respuesta:"Tu porqueria no sirve"})

        });
    }
}

export default ServicioEliminarRel_Turno_Usuario;