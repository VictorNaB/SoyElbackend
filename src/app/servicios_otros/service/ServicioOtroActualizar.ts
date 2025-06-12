import { Response } from "express";
import ServicioOtro from "../model/ServicioOtro";
import pool from "../../../config/connection/dbConnetions";
import { SQL_SERVICIO_OTRO } from "../repository/sql_servicio_otro";

class ServicioOtrosActualizar {
  protected static async actulizar(
    obj: ServicioOtro,
    res: Response
  ): Promise<any> {
    await pool
      .task(async (consulta) => {
        let caso = 1;
        let objActualizado: any;

        const otroServicio = await consulta.one(SQL_SERVICIO_OTRO.HOW_MANY, [
          obj.fechaInicioServicioOtro,
          obj.fechaFinServicioOtro,
          obj.codVehiculo,
        ]);
        console.log(otroServicio);
        console.log(otroServicio.cantidad);
        if (otroServicio.cantidad == 0) {
          caso = 2;
          objActualizado = await consulta.result(SQL_SERVICIO_OTRO.UPDATE, [
            obj.codParqueadero,
            obj.codVehiculo,
            obj.fechaPagoServicioOtro,
            obj.fechaInicioServicioOtro,
            obj.fechaFinServicioOtro,
            obj.valorServicioOtro,
            obj.codServicioOtro,
          ]);
          console.log(objActualizado);
        }

        return { caso, objActualizado };
      })
      .then(({ caso, objActualizado }) => {
        switch (caso) {
          case 1:
            res.status(400).json({ Respuesta: "ya existe" });
            break;
          case 2:
            if (objActualizado.rowCount > 0) {
              return res.status(200).json({
                Respuesta: "Actualizado",
                Detalle: objActualizado.rowCount,
              });
              break;
            } else {
              if (objActualizado.rowCount == 0) {
                return res.status(404).json({
                  Respuesta: "No se encontró el servicio otro a actualizar",
                });
              }
            }
        }
      })
      .catch((miError) => {
        if (miError.code === "23503") {
          return res.status(400).json({
            Respuesta:
              "fallo en la actualización: Alguna clave foránea no existe",
          });
        }

        console.error(miError);
        if (!res.headersSent) {
          return res.status(500).json({ Respuesta: "Algo salió mal" });
        }
      });
  }
}

export default ServicioOtrosActualizar;
