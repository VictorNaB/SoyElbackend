import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { SQL_UBICACION } from "../repository/sql_ubicacion";

class ServicioUbicacionConsulta {
    protected static async obtenerTodos(res: Response): Promise<any> {
        await pool
        .result(SQL_UBICACION.FIND_ALL)
        .then((misDatos) => {
            res.status(200).json(misDatos.rows);
        })
        .catch(( miError ) => {
            console.log("Error al obtener todas las ubicaciones: ", miError);
            res.status(400).json({error: "Error al obtener todas las ubicaciones"});
        });
    }
}

export default ServicioUbicacionConsulta;