import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { SQL_SERVICIO_OTRO } from "../repository/sql_servicio_otro";

class ServicioConsulta {
  protected static async obtenerTodos(res: Response): Promise<any> {
    await pool
      .result(SQL_SERVICIO_OTRO.FIND_ALL)
      .then((misDatos) => {
        res.status(200).json(misDatos.rows);
      })
      .catch((miError) => {
        console.log(miError);
        res.status(500).json({ Respuesta: "Algo salio mal" });
      });
  }
}
export default ServicioConsulta;
