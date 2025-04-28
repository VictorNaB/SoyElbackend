import { Response } from "express";
import Usuario from "../model/Usuario";
import pool from "../../../config/connection/dbConnetions";
import { sql_usuarios } from "../repository/Sql_Usuario";

class ServicioBorrarUsuario{
    protected static async eliminar(obj:Usuario, res:Response):Promise<any>{
        await pool.task((consulta)=>{
            return consulta.result(sql_usuarios.DELETE,[obj.codUsuario]);
        }).then((respuesta)=>{
            res.status(200).json({respuesta:"Se elimino Correctamente", "filas borradas":respuesta.rowCount,})
        }).catch((mierror)=>{
            console.log(mierror);
            res.status(400).json({respuesta:"Tu porqueria no sirve"})

        });

    }
}

export default ServicioBorrarUsuario;

