import { Response } from "express";
import IngresoServicioOtro from "../model/IngresoServicioOtro";
import pool from "../../../config/connection/dbConnetions";
import { SQL_INGRESO_SERVIVIO_OTRO } from "../repository/sql_ingreso_servicio_otro";

class ServicioIngresoServicioOtroActualizar {
  protected static async actualizarIngresoServicioOtro(
    obj: IngresoServicioOtro,
    res: Response
  ): Promise<any> {
    await pool
      .task(async (consulta) => {
        let caso = 1;
        let objActualizado: any;
        console.log(obj.codIngresoServicioOtro);
        console.log(obj.codPuesto);
        console.log(obj.fechaSalidaServicioOtro);
        const actualizar = await consulta.one(
          SQL_INGRESO_SERVIVIO_OTRO.HOW_MANY,
          [
            obj.codServicioOtro,
            obj.codPuesto,
            obj.fechaIngresoServicioOtro,
            obj.fechaSalidaServicioOtro,
          ]
        );
        console.log(actualizar);
        if (actualizar.cantidad == 0) {
          caso = 2;
          objActualizado = await consulta.result(
            SQL_INGRESO_SERVIVIO_OTRO.UPDATE,
            [
              obj.codIngresoServicioOtro,
              obj.codServicioOtro,
              obj.codPuesto,
              obj.fechaIngresoServicioOtro,
              obj.fechaSalidaServicioOtro,
            ]
          );
          console.log("----->", objActualizado);
        }

        return { caso, objActualizado };
      })
      .then(({ caso, objActualizado }) => {
        switch (caso) {
          case 1:
            res.status(404).json({ Respuesta: "ya existe" });
            break;
          case 2:
            if (objActualizado.rowCount == 0) {
              return res.status(404).json({
                Respuesta: "No se encontró el ingreso a actualizar",
              });
            }
            res.status(200).json({
              Respuesta: "Actualizado",
              Detalle: objActualizado.rowCount,
            });
            break;
        }
      })
      .catch((miError) => {
        if (miError.code == "23503") {
          return res
            .status(400)
            .json({ Respuesta: "no existe alguna clave foránea" });
        }
        console.log(miError);
        return res.status(500).json({ Respuesta: "Algo salio mal" });
      });
  }
}
export default ServicioIngresoServicioOtroActualizar;
