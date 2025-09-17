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


class ServicioBorrarUsuario {
    protected static async eliminar(obj: Usuario, res: Response): Promise<any> {
        try {
            const resultado = await pool.task(async (consulta) => {
                // Verificar accesos asociados
                const accesos = await consulta.one(
                    sql_usuarios.COUNT_ACCESOS_ASOCIADOS,
                    [obj.codUsuario]
                );

                // Verificar vehículos asociados
                const vehiculos = await consulta.one(
                    sql_usuarios.COUNT_VEHICULOS_ASOCIADOS,
                    [obj.codUsuario]
                );

                // Verificar relaciones usuario-funcionalidad
                const relUsuarioFunc = await consulta.one(
                    sql_usuarios.COUNT_RELACIONES_FUNCIONALIDAD,
                    [obj.codUsuario]
                );

                // Verificar relaciones turno-usuario
                const relTurnoUsuario = await consulta.one(
                    sql_usuarios.COUNT_RELACIONES_TURNO,
                    [obj.codUsuario]
                );

                const tieneAccesos = parseInt(accesos.cantidad) > 0;
                const tieneVehiculos = parseInt(vehiculos.cantidad) > 0;
                const tieneRelacionesFunc = parseInt(relUsuarioFunc.cantidad) > 0;
                const tieneRelacionesTurno = parseInt(relTurnoUsuario.cantidad) > 0;

                if (tieneAccesos || tieneVehiculos || tieneRelacionesFunc || tieneRelacionesTurno) {
                    return {
                        tipo: 'error',
                        status: 400,
                        data: {
                            respuesta: "No se puede eliminar el usuario",
                            detalles: {
                                tieneAccesos,
                                tieneVehiculos,
                                tieneRelacionesFunc,
                                tieneRelacionesTurno,
                                mensaje: "El usuario tiene accesos, vehículos o relaciones asociadas que deben ser eliminadas primero"
                            }
                        }
                    };
                }

                // Si pasa la validación, procedemos a eliminar
                const respuesta = await consulta.result(sql_usuarios.DELETE, [obj.codUsuario]);
                
                if (respuesta.rowCount === 0) {
                    return {
                        tipo: 'not_found',
                        status: 404,
                        data: {
                            respuesta: "No se encontró el usuario a eliminar",
                            codUsuario: obj.codUsuario
                        }
                    };
                }

                return {
                    tipo: 'success',
                    status: 200,
                    data: {
                        respuesta: "Usuario eliminado correctamente",
                        detalles: {
                            codUsuario: obj.codUsuario,
                            filasBorradas: respuesta.rowCount
                        }
                    }
                };
            });

            // Enviar la respuesta basada en el resultado
            res.status(resultado.status).json(resultado.data);

        } catch (error: any) {
            console.log(error);
            res.status(500).json({
                respuesta: "Error al eliminar el usuario",
                error: error.message || 'Error desconocido'
            });
        }

    }
}

export default ServicioBorrarUsuario;


