import pool from "../../../config/connection/dbConnetions";
import Vehiculo from "../model/Vehiculo";
import { Response } from "express";
import { SQL_VEHICULO } from "../repository/sql_vehiculo";

class ServicioVehiculoActualizar {
  public static async actualizarVehiculo(
    objVehiculo: Vehiculo,
    res: Response
  ): Promise<any> {
    await pool
      .task(async (consulta) => {
        let caso = 1;
        let objActualizado: any;

        const existeUsuario = await consulta.oneOrNone(SQL_VEHICULO.FINDBY_USUARIO, [objVehiculo.codUsuario]);
        if(!existeUsuario){
          caso = 3;
          return { caso };
        }

        const existeTipoVehiculo = await consulta.oneOrNone(SQL_VEHICULO.FINDBY_TIPO_VEHICULO, [objVehiculo.codTipoVehiculo]);
        if(!existeTipoVehiculo){
          caso = 4;
          return { caso };
        }

        // Verificar si la placa ya existe para otro vehículo
        const placas = await consulta.oneOrNone(
          SQL_VEHICULO.FINDBY_PLACAS2,
          [objVehiculo.placaVehiculo, objVehiculo.codVehiculo]
        );

        if (placas.cantidad == 0) {
          caso = 2;
          objActualizado = await consulta.result(SQL_VEHICULO.UPDATE, [
            objVehiculo.codTipoVehiculo,
            objVehiculo.codUsuario,
            objVehiculo.placaVehiculo,
            objVehiculo.codVehiculo,
          ]);
        }
        return { caso, objActualizado };
      })
      .then(({ caso, objActualizado }) => {
        switch (caso) {
          case 1:
            res.status(400).json({
              respuesta: "Ya existe otro vehículo con esa placa",
            });
            break;
          case 2:
            res.status(200).json({
              respuesta: "Vehículo actualizado correctamente",
              "Filas actualizadas": objActualizado.rowCount,
            });
            break;
          case 3:
            res.status(400).json({ respuesta: "El usuario no existe" });
            break;
          case 4:
            res.status(400).json({ respuesta: "El tipo de vehículo no existe" });
            break;
          

          default:
            break;
        }
      })
      .catch((miError) => {
        console.error(miError);
        res.status(400).json({ respuesta: "Error actualizando el vehículo" });
      });
  }
}
export default ServicioVehiculoActualizar;