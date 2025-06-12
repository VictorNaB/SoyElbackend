import { Response } from "express";
import Rel_rol_funcionalidad from "../model/Rel_rol_funcionalidad";
import pool from "../../../config/connection/dbConnetions";
import SQL_REL_ROL_FUNCIONALIDAD from "../repository/sql_rel_rol_funcionalidad";

class ServicioBorrarRelRolFuncionalidad {
    public static async borrar(obj: Rel_rol_funcionalidad, res: Response): Promise<any> {
        try {
            await pool.task(async (consulta) => {
                // Verificar si la relación existe
                const existe = await consulta.one(SQL_REL_ROL_FUNCIONALIDAD.verifyExists, 
                    [obj.cod_rol, obj.cod_funcionalidad]);

                if (existe.cantidad === '0') {
                    return res.status(404).json({
                        respuesta: "No se encontró la relación rol-funcionalidad a eliminar",
                        detalles: {
                            codRol: obj.cod_rol,
                            codFuncionalidad: obj.cod_funcionalidad
                        }
                    });
                }

                // Si existe, procedemos a eliminar
                const respuesta = await consulta.result(SQL_REL_ROL_FUNCIONALIDAD.delete, 
                    [obj.cod_rol, obj.cod_funcionalidad]);

                res.status(200).json({
                    respuesta: "Relación rol-funcionalidad eliminada correctamente",
                    detalles: {
                        codRol: obj.cod_rol,
                        codFuncionalidad: obj.cod_funcionalidad,
                        filasBorradas: respuesta.rowCount
                    }
                });
            });
        } catch (error: any) {
            console.log(error);
            res.status(500).json({
                respuesta: "Error al eliminar la relación rol-funcionalidad",
                error: error.message || 'Error desconocido'
            });
        }
    }
}

export default ServicioBorrarRelRolFuncionalidad; 