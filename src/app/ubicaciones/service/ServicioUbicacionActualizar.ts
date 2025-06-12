import { Response } from "express";

import Ubicacion from "../model/Ubicacion";
import pool from "../../../config/connection/dbConnetions";
import { SQL_UBICACION } from "../repository/sql_ubicacion";

class ServicioUbicacionActualizar {
    protected static async actualizarUbicacion(ubicacion: Ubicacion, res: Response): Promise<void> {
        // Validación temprana fuera del task si es posible
        if (!ubicacion.nombreUbicacion || ubicacion.nombreUbicacion.trim() === '') {
            res.status(400).type('text').send("ERROR_NOMBRE_VACIO"); // Envía texto plano para depurar
            return; // Es importante mantener este return para salir de la función.
        } else {
            // Si el nombre es válido, proceder con el task
            pool.task(async (consulta) => {
                // Verificar si la ubicación a actualizar existe
                const ubicacionExistente = await consulta.oneOrNone(SQL_UBICACION.FIND_BY_ID, [ubicacion.codUbicacion]);

                if (!ubicacionExistente) {
                    if (!res.headersSent) {
                        res.status(404).json({
                            status: "error",
                            message: "Ubicación no encontrada para actualizar"
                        });
                    }
                    return;
                }

                // Verificar si ya existe OTRA ubicación con el mismo nombre (y diferente ID)
                const otraUbicacionMismoNombre = await consulta.oneOrNone(
                    SQL_UBICACION.HOW_MANY_BY_NAME_AND_DIFFERENT_ID,
                    [ubicacion.nombreUbicacion, ubicacion.codUbicacion]
                );

                if (otraUbicacionMismoNombre && otraUbicacionMismoNombre.cantidad > 0) {
                    if (!res.headersSent) {
                        res.status(400).json({
                            status: "error",
                            message: "Ya existe otra ubicación con ese nombre"
                        });
                    }
                    return;
                }

                // Proceder con la actualización
                const { rowCount } = await consulta.result(
                    SQL_UBICACION.UPDATE,
                    [
                        ubicacion.codPadreUbicacion === undefined || ubicacion.codPadreUbicacion === null ? null : Number(ubicacion.codPadreUbicacion),
                        ubicacion.codExternoUbicacion,
                        ubicacion.nombreUbicacion,
                        ubicacion.codUbicacion
                    ]
                );

                if (rowCount > 0) {
                     if (!res.headersSent) {
                        // Devolver la ubicación actualizada obteniéndola de nuevo o usando RETURNING * en UPDATE
                        // Por ahora, devolvemos el objeto de entrada como referencia, aunque no tenga el RETURNING
                        const ubicacionActualizadaParaRespuesta = {
                            cod_ubicacion: ubicacion.codUbicacion,
                            cod_padre_ubicacion: ubicacion.codPadreUbicacion === undefined || ubicacion.codPadreUbicacion === null ? null : Number(ubicacion.codPadreUbicacion),
                            cod_externo_ubicacion: ubicacion.codExternoUbicacion,
                            nombre_ubicacion: ubicacion.nombreUbicacion
                        };
                        res.status(200).json({
                            status: "success",
                            message: "Ubicación actualizada correctamente",
                            data: ubicacionActualizadaParaRespuesta 
                        });
                    }
                } else {
                    // Esto no debería ocurrir si la verificación de existencia inicial pasó y no hay error de BD
                    // pero si rowCount es 0 por alguna razón (ej. la condición del WHERE no coincidió mágicamente)
                    if (!res.headersSent) {
                        res.status(400).json({ 
                            status: "error", 
                            message: "No se pudo actualizar la ubicación o no se realizaron cambios." 
                        });
                    }
                }
            })
            .catch((error) => {
                console.error("Error al actualizar la ubicación: ", error);
                if (!res.headersSent) {
                    res.status(500).json({
                        status: "error",
                        message: "Error interno del servidor al actualizar la ubicación",
                        detail: error instanceof Error ? error.message : "Error desconocido"
                    });
                }
            });
        }
    }
}

export default ServicioUbicacionActualizar;