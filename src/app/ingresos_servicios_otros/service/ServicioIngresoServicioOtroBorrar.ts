import { Response } from "express";
import IngresoServicioOtro from "../model/IngresoServicioOtro";
import pool from "../../../config/connection/dbConnetions";
import { SQL_INGRESO_SERVIVIO_OTRO } from "../repository/sql_ingreso_servicio_otro";

class ServicioIngresoServicioOtroBorrar {
  protected static async borrarIngresoSErvicioOtro(
    obj: IngresoServicioOtro,
    res: Response
  ): Promise<any> {
    await pool
      .task((consulta) => {
        return consulta.result(SQL_INGRESO_SERVIVIO_OTRO.DELETE, [
          obj.codIngresoServicioOtro,
        ]);
      })
      .then((respuesta) => {
        console.log(respuesta);
        if (respuesta.rowCount == 0) {
          res.status(404).json({ Respuesta: "Dato no encontrado" });
        } else {
          res.status(200).json({
            respuesta: "DatoEliminado",
            "Filas borradas: ": respuesta.rowCount,
          });
        }
      })
      .catch((miError) => {
        console.log(miError);
        if (miError.code == "23503") {
          return res.status(400).json({
            Respuesta:
              "No se puede eliminar el registro porque tiene dependencias",
          });
        } else {
          return res.status(500).json({ Respuesta: "Algo salio mal" });
        }
      });
  }
}

export default ServicioIngresoServicioOtroBorrar;
