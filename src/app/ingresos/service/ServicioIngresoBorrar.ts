import { Response } from "express";
import Ingreso from "../model/Ingreso";
import pool from "../../../config/connection/dbConnetions";
import { SQL_INGRESO } from "../repository/sql_ingreso";

class ServicioIngresoBorrar {
  protected static async borrar(obj: Ingreso, res: Response): Promise<any> {
    await pool
      .task((consulta) => {
        return consulta.result(SQL_INGRESO.DELETE, [obj.codIngreso]);
      })
      .then((respuesta) => {
        if (respuesta.rowCount > 0) {
          res.status(200).json({
            respuesta: "Ya lo borré",
            filas_borradas: respuesta.rowCount,
          });
        } else {
          res.status(404).json({
            respuesta: "No se encontró el ingreso para borrar",
            filas_borradas: 0,
          });
        }
      })
      .catch((miError) => {
        console.log(miError);
        res.status(500).json({ respuesta: "Error eliminando" });
      });
  }
}
export default ServicioIngresoBorrar;
