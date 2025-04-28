import { Response } from "express";
import Rol from "../model/Rol";
import pool from "../../../config/connection/dbConnetions";
import { sql_roles } from "../repository/Sql_rol";

class ServicioRolBorrar {
  protected static async borrar(obj: Rol, res: Response): Promise<any> {
    await pool
      .task((consulta) => {
        return consulta.result(sql_roles.DELETE, [obj.codRol]);
      })
      .then((respuesta) => {
        res
          .status(200)
          .json({
            respuesta: "Ya lo borre",
            "filas Borradas": respuesta.rowCount,
          });
      })
      .catch((mierror) => {
        console.log(mierror);
        res.status(400).json({ respuesta: "error eliminando" });
      });
  }
}

export default ServicioRolBorrar;
