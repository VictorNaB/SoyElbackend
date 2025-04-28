import { Response } from "express";
import Accesos from "../model/Accesos";
import pool from "../../../config/connection/dbConnetions";
import { sql_Accesos } from "../repository/Sql_Accesos";

class ServicioActualizarAcceso {
  protected static async ActualizarAcceso(obj: Accesos, res: Response) {
    await pool
      .task(async (consulta) => {
        let caso = 1;
        let objGrabado: any;
        const access: any = await consulta.oneOrNone(sql_Accesos.getById, [
          obj.codUsuario,
        ]);
        if (access == null) {
          caso = 2;
        } else {
          objGrabado = await consulta.none(sql_Accesos.UPDATE, [
            obj.codUsuario,
            obj.correo,
            obj.clave,
            obj.uuid,
          ]);
        }
        return { caso, objGrabado };
      })
      .then(({ caso, objGrabado }) => {
        switch (caso) {
          case 2:
            res
              .status(400)
              .json({ respuesta: "El acceso no existe en la base de datos" });
            break;
          default:
            res.status(200).json({
              respuesta: "Acceso actualizado correctamente",
              detalle: objGrabado,
            });
            break;
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          respuesta: "Error al actualizar el acceso",
          detalle: error.message,
        });
      });
  }
}

export default ServicioActualizarAcceso;
