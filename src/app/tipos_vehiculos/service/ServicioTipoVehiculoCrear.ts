import { Response } from "express";
import TipoVehiculo from "../model/TipoVehiculo";
import pool from "../../../config/connection/dbConnetions";
import { SQL_TIPO_VEHICULO } from "../repository/sql_tipoVehiculo";
import { validationResult } from "express-validator";

class ServicioTipoVehiculoCrear {
  protected static async grabarTipoVehiculo(
    obj: TipoVehiculo,
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

      // Validaciones adicionales
      if (!obj || !obj.claseTipoVehiculo) {
        return res.status(400).json({
          respuesta: "Datos de tipo de vehículo inválidos",
        });
      }

      // Normalizar el nombre (eliminar espacios en blanco)
      const nombreNormalizado = obj.claseTipoVehiculo.trim();
      
      if (nombreNormalizado.length === 0) {
        return res.status(400).json({
          respuesta: "El nombre del tipo de vehículo no puede estar vacío",
        });
      }

      const resultado = await pool.task(async (consulta) => {
        const tiposVehiculos = await consulta.one(SQL_TIPO_VEHICULO.HOW_MANY, [
          nombreNormalizado,
        ]);

        if (tiposVehiculos.cantidad > 0) {
          return { caso: 1 };
        }

        const objGrabado = await consulta.one(SQL_TIPO_VEHICULO.ADD, [
          nombreNormalizado,
        ]);

        return { caso: 2, objGrabado };
      });

      switch (resultado.caso) {
        case 1:
          // Tipo de vehículo ya existe
          return res.status(409).json({
            respuesta: "El tipo de vehículo ya existe",
          });
        case 2:
          // Tipo de vehículo creado exitosamente
          return res.status(201).json({
            respuesta: "Tipo de vehículo creado exitosamente",
            tipoVehiculo: resultado.objGrabado
          });
        default:
          // Caso inesperado
          return res.status(500).json({
            respuesta: "Error inesperado al crear tipo de vehículo",
          });
      }
    } catch (miError) {
      console.error("Error al crear tipo de vehículo:", miError);
      
      // Manejo específico de errores de base de datos
      if (miError instanceof Error) {
        if (miError.message.includes("duplicate key") || miError.message.includes("unique constraint")) {
          return res.status(409).json({
            respuesta: "El tipo de vehículo ya existe",
          });
        }
      }
      
      res.status(500).json({
        respuesta: "Error interno al crear tipo de vehículo",
      });
    }
  }
}

export default ServicioTipoVehiculoCrear;