import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import SQL_REL_ROL_FUNCIONALIDAD from "../repository/sql_rel_rol_funcionalidad";

class ServicioObtenerRelRolFuncionalidadConsultar{
  protected static async Obtener(res: Response): Promise<any> {
    await pool
      .result(SQL_REL_ROL_FUNCIONALIDAD.getAll)
      .then((misDatos) => {
        return res.status(200).json({
          respuesta:
            "Relaciones de rol con funcionalidades obtenidas correctamente",
          detalle: misDatos.rows,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ Respuesta: "Algo salio mal" });
      });
  }
}

export default ServicioObtenerRelRolFuncionalidadConsultar;
