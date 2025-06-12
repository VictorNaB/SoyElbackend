import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { sql_funcionalidad } from "../repository/Sql_Funcionalidad";

class ServicioObtenerFuncionalidad {
    protected static async Obtener(res: Response) {
        try {
            const functionality = await pool.any(sql_funcionalidad.getAll);
            res.status(200).json({
                respuesta: "Funcionalidades obtenidas correctamente",
                detalle: functionality
            });
        } catch (error) {
            res.status(400).json({
                respuesta: "Error al obtener las funcionalidades",
                detalle: error instanceof Error ? error.message : String(error)
            });
        }
    }
}

export default ServicioObtenerFuncionalidad;