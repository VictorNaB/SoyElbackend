import { Response } from "express";
import Funcionalidad from "../model/Funcionalidad";
import pool from "../../../config/connection/dbConnetions";
import { sql_funcionalidad } from "../repository/Sql_Funcionalidad";

class ServicioBorrarFuncionalidad {
    protected static async Borrar(obj: Funcionalidad, res: Response) {
        try {
            // First check if the functionality exists
            const exists = await pool.oneOrNone(sql_funcionalidad.getById, [obj.codFuncionalidad]);
            
            if (!exists) {
                return res.status(404).json({
                    status: "error",
                    message: "La funcionalidad no existe"
                });
            }

            // Check if the functionality is a parent of other functionalities
            const hasChildren = await pool.oneOrNone(
                sql_funcionalidad.countChildren,
                [obj.codFuncionalidad]
            );

            if (hasChildren && hasChildren.count > 0) {
                return res.status(400).json({
                    status: "error",
                    message: "No se puede eliminar la funcionalidad porque es padre de otras funcionalidades"
                });
            }

            // Check if the functionality is associated with any roles
            const hasRoles = await pool.oneOrNone(
                sql_funcionalidad.countRoles,
                [obj.codFuncionalidad]
            );

            if (hasRoles && hasRoles.count > 0) {
                return res.status(400).json({
                    status: "error",
                    message: "No se puede eliminar la funcionalidad porque está asociada a roles"
                });
            }

            // Delete the functionality
            await pool.none(sql_funcionalidad.delete, [obj.codFuncionalidad]);
            
            res.status(200).json({
                status: "success",
                message: "Funcionalidad eliminada correctamente"
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: "Error al eliminar la funcionalidad",
                detail: error instanceof Error ? error.message : "Error desconocido"
            });
        }
    }
}

export default ServicioBorrarFuncionalidad;
