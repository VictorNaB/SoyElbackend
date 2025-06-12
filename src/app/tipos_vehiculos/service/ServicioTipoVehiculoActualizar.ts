import { Response } from "express";
import TipoVehiculo from "../model/TipoVehiculo";
import pool from "../../../config/connection/dbConnetions";
import { SQL_TIPO_VEHICULO } from "../repository/sql_tipoVehiculo";
import { validationResult } from "express-validator";

class ServicioTipoVehiculoActualizar {
  protected static async actualizarTipoVehiculo(
    objTipoVehiculo: TipoVehiculo,
    res: Response
  ): Promise<any> {
    try {
      // Verificar errores de validación de express-validator
      const errors = validationResult(res);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          respuesta: errors.array()
        });
      }

      // Validaciones básicas
      if (
        !objTipoVehiculo ||
        !objTipoVehiculo.codTipoVehiculo ||
        !objTipoVehiculo.claseTipoVehiculo
      ) {
        return res.status(400).json({
          respuesta: "Datos de tipo de vehículo inválidos",
        });
      }

      const nombreNormalizado = objTipoVehiculo.claseTipoVehiculo.trim();
      
      if (nombreNormalizado.length === 0) {
        return res.status(400).json({
          respuesta: "El nombre del tipo de vehículo no puede estar vacío",
        });
      }

      // Verificar que el tipo de vehículo existe
      const tipoVehiculoExistente = await pool.oneOrNone(
        SQL_TIPO_VEHICULO.FIND_BY_ID,
        [objTipoVehiculo.codTipoVehiculo]
      );

      if (!tipoVehiculoExistente) {
        return res.status(404).json({
          respuesta: "El tipo de vehículo no existe",
        });
      }

      // Verificar que no existe otro tipo con el mismo nombre
      const tiposVehiculosDuplicados = await pool.one(SQL_TIPO_VEHICULO.HOW_MANY_EXCLUDING_CURRENT, [
        nombreNormalizado,
        objTipoVehiculo.codTipoVehiculo
      ]);

      if (tiposVehiculosDuplicados.cantidad > 0) {
        return res.status(409).json({
          respuesta: "Ya existe un tipo de vehículo con este nombre",
        });
      }

      // Realizar la actualización
      const resultado = await pool.result(SQL_TIPO_VEHICULO.UPDATE, [
        nombreNormalizado,
        objTipoVehiculo.codTipoVehiculo,
      ]);

      if (resultado.rowCount === 0) {
        return res.status(500).json({
          respuesta: "No se pudo actualizar el tipo de vehículo",
        });
      }

      res.status(200).json({
        respuesta: "Tipo de vehículo actualizado correctamente",
        detalles: {
          filasActualizadas: resultado.rowCount,
          codigoTipoVehiculo: objTipoVehiculo.codTipoVehiculo,
          nuevoNombre: nombreNormalizado,
        },
      });
    } catch (miError) {
      console.error("Error al actualizar tipo de vehículo:", miError);
      
      if (miError instanceof Error) {
        if (miError.message.includes("duplicate key") || miError.message.includes("unique constraint")) {
          return res.status(409).json({
            respuesta: "Ya existe un tipo de vehículo con este nombre",
          });
        }
      }
      
      return res.status(500).json({
        respuesta: "Error interno al actualizar el tipo de vehículo",
      });
    }
  }
}

export default ServicioTipoVehiculoActualizar;