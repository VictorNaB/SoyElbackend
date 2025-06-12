import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import Ubicacion from "../model/Ubicacion";
import { SQL_UBICACION } from "../repository/sql_ubicacion";

class ServicioUbicacionBorrar {
    protected static async borrarUbicacion(reqBody: { codUbicacion: number }, res: Response): Promise<void> {
        const { codUbicacion } = reqBody;

        pool.task(async (consulta) => {
            const depParqueaderos = await consulta.one(SQL_UBICACION.COUNT_PARQUEADEROS_BY_UBICACION_ID, [codUbicacion]);
            if (depParqueaderos.cantidad_parqueaderos_asignados > 0) {
                if (!res.headersSent) {
                    res.status(400).json({
                        status: "error",
                        message: "No se puede eliminar la ubicación: tiene parqueaderos asignados."
                    });
                }
                return;
            }

            const depUbicacionesHijas = await consulta.one(SQL_UBICACION.COUNT_UBICACIONES_HIJAS, [codUbicacion]);
            if (depUbicacionesHijas.cantidad_ubicaciones_hijas > 0) {
                if (!res.headersSent) {
                    res.status(400).json({
                        status: "error",
                        message: "No se puede eliminar la ubicación: tiene ubicaciones hijas asignadas."
                    });
                }
                return;
            }

            const { rowCount } = await consulta.result(SQL_UBICACION.DELETE, [codUbicacion]);

            if (rowCount > 0) {
                if (!res.headersSent) {
                    res.status(200).json({
                        status: "success",
                        message: "Ubicación eliminada exitosamente"
                    });
                }
            } else {
                if (!res.headersSent) {
                    res.status(404).json({
                        status: "error",
                        message: "Ubicación no encontrada o ya fue eliminada."
                    });
                }
            }
        })
        .catch((error) => {
            console.error("Error al borrar la ubicación: ", error);
            if (!res.headersSent) {
                res.status(500).json({
                    status: "error",
                    message: "Error interno del servidor al procesar la eliminación.",
                    detail: error instanceof Error ? error.message : "Error desconocido"
                });
            }
        });
    }
}

export default ServicioUbicacionBorrar;