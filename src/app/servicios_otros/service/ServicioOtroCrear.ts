import { Response } from "express";
import ServicioOtro from "../model/ServicioOtro";
import pool from "../../../config/connection/dbConnetions";
import { SQL_SERVICIO_OTRO } from "../repository/sql_servicio_otro";

class ServicioOtroCrear {
  protected static async grabarServicioOtro(
    obj: ServicioOtro,
    res: Response
  ): Promise<any> {
    await pool
      .task(async (consulta) => {
        let caso = 1;
        let objGrabado: any;

        const otroServicio = await consulta.one(SQL_SERVICIO_OTRO.HOW_MANY, [
          obj.fechaInicioServicioOtro,
          obj.fechaFinServicioOtro,
          obj.codVehiculo,
        ]);

        console.log(otroServicio);
        if (otroServicio.cantidad == 0) {
          caso = 2;
          objGrabado = await consulta.one(SQL_SERVICIO_OTRO.ADD, [
            obj.codParqueadero,
            obj.codVehiculo,
            obj.fechaPagoServicioOtro,
            obj.fechaInicioServicioOtro,
            obj.fechaFinServicioOtro,
            obj.valorServicioOtro,
          ]);
        }
        return { caso, objGrabado };
      })
      .then(({ caso, objGrabado }) => {
        switch (caso) {
          case 1:
            return res
              .status(400)
              .json({ Respuesta: "Error al grabar ya existe" });
            break;
          case 2:
            res.status(200).json(objGrabado);
            break;
        }
      })
      .catch((miError) => {
        console.log(miError);
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
export default ServicioOtroCrear;
