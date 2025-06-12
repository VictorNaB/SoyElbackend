import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import IngresoServicioOtro from "../model/IngresoServicioOtro";
import { SQL_INGRESO_SERVIVIO_OTRO } from "../repository/sql_ingreso_servicio_otro";

class ServicioIngresoServicioOtroCrear {
  protected static async grabarIngresoServicioOtro(
    obj: IngresoServicioOtro,
    res: Response
  ): Promise<any> {
    await pool
      .task(async (consulta) => {
        let caso = 1;
        let objGrabado: any;

        const otroIngresoServicio = await consulta.one(
          SQL_INGRESO_SERVIVIO_OTRO.HOW_MANY,
          [
            obj.codServicioOtro,
            obj.codPuesto,
            obj.fechaIngresoServicioOtro,
            obj.fechaSalidaServicioOtro,
          ]
        );
        if (otroIngresoServicio.cantidad == 0) {
          caso = 2;
          objGrabado = await consulta.one(SQL_INGRESO_SERVIVIO_OTRO.ADD, [
            obj.codServicioOtro,
            obj.codPuesto,
            obj.fechaIngresoServicioOtro,
            obj.fechaSalidaServicioOtro,
          ]);
        } 
        console.log(caso);
        return { caso, objGrabado };
      })
      .then(({ caso, objGrabado }) => {
        switch (caso) {
          case 1:
            res.status(400).json({ Respuesta: "Error al grabar ya existe" });
            break;
          case 2:
            res
              .status(200)
              .json({ Respuesta: "ingreso grabado", objGrabado: objGrabado });
            break;
          
        }
      })
      .catch((miError) => {
        console.error(miError);

        if (miError.code === "23503") {
          return res.status(400).json({
            Respuesta: "Error: Alguna clave foránea no existe",
          });
        }

        if (!res.headersSent) {
          return res.status(500).json({ Respuesta: "Algo salio mal" });
        }
      });
  }
}
export default ServicioIngresoServicioOtroCrear;
