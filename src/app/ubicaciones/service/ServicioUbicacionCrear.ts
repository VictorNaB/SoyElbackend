import { Response } from "express";

import Ubicacion from "../model/Ubicacion";
import pool from "../../../config/connection/dbConnetions";
import { SQL_UBICACION } from "../repository/sql_ubicacion";

class ServicioUbicacionCrear {
    protected static async crearUbicacion(ubicacion: Ubicacion, res: Response): Promise<void> {
        // Validación temprana fuera del task si no depende de la 'consulta'
        if (!ubicacion.nombreUbicacion || ubicacion.nombreUbicacion.trim() === '') {
            res.status(400).json({
                status: "error",
                message: "El nombre de la ubicación no puede estar vacío"
            });
            return; // Terminar ejecución aquí
        }

        pool.task(async (consulta) => {
            // Verificar si ya existe una ubicación con el mismo nombre
            const existeUbicacion = await consulta.one(SQL_UBICACION.HOW_MANY, [ubicacion.nombreUbicacion]);

            if (existeUbicacion.cantidad > 0) {
                // Asegurarse que la respuesta se envíe y no se continúe
                if (!res.headersSent) {
                    res.status(400).json({
                        status: "error",
                        message: "Ya existe una ubicación con ese nombre"
                    });
                }
                return; // Terminar el callback del task
            }

            const codPadre = ubicacion.codPadreUbicacion === undefined || ubicacion.codPadreUbicacion === null 
                            ? null 
                            : Number(ubicacion.codPadreUbicacion);

            const objGrabado = await consulta.one(
                SQL_UBICACION.ADD,
                [
                    codPadre,
                    ubicacion.codExternoUbicacion,
                    ubicacion.nombreUbicacion,
                ]
            );
            // Enviar respuesta de éxito solo si no se ha enviado antes
            if (!res.headersSent) {
                res.status(201).json({
                    status: "success",
                    message: "Ubicación creada correctamente",
                    data: objGrabado
                });
            }
        })
        .catch((error) => {
            console.error("Error al crear la ubicación: ", error);
            if (!res.headersSent) {
                res.status(500).json({
                    status: "error",
                    message: "Error interno del servidor al crear la ubicación",
                    detail: error instanceof Error ? error.message : "Error desconocido"
                });
            }
        });
    }
}

export default ServicioUbicacionCrear;