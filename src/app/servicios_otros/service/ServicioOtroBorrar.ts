import { Response } from "express";
import ServicioOtro from "../model/ServicioOtro";
import pool from "../../../config/connection/dbConnetions";
import { SQL_SERVICIO_OTRO } from "../repository/sql_servicio_otro";

class ServicioOtroBorrar {
  protected static async borrar(
    obj: ServicioOtro,
    res: Response
  ): Promise<any> {
    await pool
      .task((consulta) => {
        return consulta.result(SQL_SERVICIO_OTRO.DELETE, [obj.codServicioOtro]);
      })
      .then((respuesta) => {
        if (respuesta.rowCount == 0) {
          res.status(404).json({ Respuesta: "Dato no encontrado" });
        } else {
          return res.status(200).json({
            Respuesta: "Eliminado",
            "Filas borradas": respuesta.rowCount,
          });
        }
      })
      .catch((miError) => {
        console.log(miError);

        return res.status(500).json({ Respuesta: "Algo salio mal" });
      });
  }
}
export default ServicioOtroBorrar;
