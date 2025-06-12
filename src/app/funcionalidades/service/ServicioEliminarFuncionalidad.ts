import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { sql_funcionalidad } from "../repository/Sql_Funcionalidad";

class ServicioEliminarFuncionalidad {
    public static async eliminar(codFuncionalidad: number, res: Response): Promise<void> {
        try {
            await pool.task(async (consulta) => {
                // Verificar relaciones rol-funcionalidad
                const relRolFunc = await consulta.one(
                    sql_funcionalidad.countRoleRelations,
                    [codFuncionalidad]
                );

                // Verificar relaciones usuario-funcionalidad
                const relUsuarioFunc = await consulta.one(
                    sql_funcionalidad.countUserRelations,
                    [codFuncionalidad]
                );

                // Verificar funcionalidades hijas
                const funcionalidadesHijas = await consulta.one(
                    sql_funcionalidad.countChildFunctionalities,
                    [codFuncionalidad]
                );

                if (relRolFunc.cantidad !== '0' || relUsuarioFunc.cantidad !== '0' || 
                    funcionalidadesHijas.cantidad !== '0') {
                    return res.status(400).json({
                        respuesta: "No se puede eliminar la funcionalidad",
                        detalles: {
                            tieneRelacionesRol: relRolFunc.cantidad !== '0',
                            tieneRelacionesUsuario: relUsuarioFunc.cantidad !== '0',
                            tieneFuncionalidadesHijas: funcionalidadesHijas.cantidad !== '0',
                            mensaje: "La funcionalidad tiene roles, usuarios o funcionalidades hijas asociadas que deben ser eliminadas primero"
                        }
                    });
                }

                // Si pasa la validación, procedemos a eliminar
                await consulta.none(sql_funcionalidad.delete, [codFuncionalidad]);
                
                res.status(200).json({
                    respuesta: "Funcionalidad eliminada correctamente",
                    detalles: { codFuncionalidad }
                });
            });
        } catch (error: any) {
            console.log(error);
            res.status(500).json({
                respuesta: "Error al eliminar la funcionalidad",
                error: error.message || 'Error desconocido'
            });
        }
    }
}

export default ServicioEliminarFuncionalidad; 