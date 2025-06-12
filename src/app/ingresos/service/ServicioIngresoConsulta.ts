import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { SQL_INGRESO } from "../repository/sql_ingreso";

class ServicioIngresoConsultar {
  protected static async obtenerTodos(res: Response): Promise<any> {
    pool
      .result(SQL_INGRESO.FIND_ALL)
      .then((misDatos) => {
        res.status(200).json(misDatos.rows);
      })
      .catch((miError) => {
        console.log(miError);
        res.status(400).json({ Respuesta: "Algo salio mal" });
      });
  }
}
export default ServicioIngresoConsultar;
