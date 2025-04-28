import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { sql_usuarios } from "../repository/Sql_Usuario";

class ServicioConsultarUsuario {
    
    protected static async consultarUsuario(res: Response): Promise<any> {
        await pool.result(sql_usuarios.FIND_BY_ID)
            .then((misDatos) => {
                res.status(200).json(misDatos.rows);
            })
            .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: "Error al consultar los usuarios" });
            });
    }
}


export default ServicioConsultarUsuario;