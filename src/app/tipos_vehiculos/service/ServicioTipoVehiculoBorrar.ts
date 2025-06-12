import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import TipoVehiculo from "../model/TipoVehiculo";
import { SQL_TIPO_VEHICULO } from "../repository/sql_tipoVehiculo";
 
class ServicioTipoVehiculoBorrar {
  public static async borrar(obj: TipoVehiculo, res: Response): Promise<any> {
    try {
      // Validación básica de entrada
      if (!obj || !obj.codTipoVehiculo) {
        return res.status(400).json({
          respuesta: "Código de tipo de vehículo inválido",
        });
      }

      // Primero verificar si el tipo de vehículo existe
      const tipoVehiculoExiste = await pool.oneOrNone(
        SQL_TIPO_VEHICULO.FIND_BY_ID,
        [obj.codTipoVehiculo]
      );

      if (!tipoVehiculoExiste) {
        return res.status(404).json({
          respuesta: "El tipo de vehículo no existe",
        });
      }

      const resultado = await pool.task(async (consulta) => {
        // Verificar si existen vehículos asociados a este tipo
        const vehiculosAsociados = await consulta.oneOrNone(
          SQL_TIPO_VEHICULO.COUNT_VEHICULOS_ASOCIADOS,
          [obj.codTipoVehiculo]
        );
 
        // Si hay vehículos asociados, no permitir la eliminación
        if (vehiculosAsociados && parseInt(vehiculosAsociados.cantidad) > 0) {
          return {
            caso: 2, // Tiene vehículos asociados
            vehiculosAsociados: vehiculosAsociados.cantidad,
          };
        }
 
        // Si no hay vehículos asociados, proceder con la eliminación
        const resultadoEliminacion = await consulta.result(SQL_TIPO_VEHICULO.DELETE, [
          obj.codTipoVehiculo,
        ]);
        
        return { 
          caso: 3, // Eliminación exitosa
          filasBorradas: resultadoEliminacion.rowCount 
        };
      });
 
      // Manejar los resultados
      switch (resultado.caso) {
        case 2:
          // Tiene vehículos asociados
          return res.status(400).json({
            respuesta: "No se puede eliminar este tipo de vehículo",
            detalle: `No se puede eliminar porque hay ${resultado.vehiculosAsociados} vehículos asociados.`,
          });

        case 3:
          // Eliminación exitosa
          if (resultado.filasBorradas === 0) {
            return res.status(500).json({
              respuesta: "Error interno al eliminar el tipo de vehículo",
            });
          }

          return res.status(200).json({
            respuesta: "Tipo de vehículo eliminado correctamente",
            "Filas borradas": resultado.filasBorradas,
          });

        default:
          return res.status(500).json({
            respuesta: "Error inesperado al eliminar tipo de vehículo",
          });
      }
    } catch (miError: any) {
      console.error("Error al eliminar tipo de vehículo:", miError);
 
      // Manejo específico de error de clave foránea
      if (
        miError.code === "23503" &&
        miError.constraint === "fk_vehiculo_ref_tiposvehi"
      ) {
        return res.status(400).json({
          respuesta: "No se puede eliminar este tipo de vehículo",
          detalle: "No se puede eliminar porque hay vehículos asociados.",
          codigoError: miError.code,
        });
      }
 
      // Manejo de otros errores
      res.status(500).json({
        respuesta: "Error interno al eliminar el tipo de vehículo",
        detalle: miError.message || "Error desconocido",
      });
    }
  }
}
 
export default ServicioTipoVehiculoBorrar;