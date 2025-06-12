import { Response } from "express";
import Funcionalidad from "../model/Funcionalidad";
import pool from "../../../config/connection/dbConnetions";
import { sql_funcionalidad } from "../repository/Sql_Funcionalidad";

class ServiceFunctionalityUpdate {
  protected static async Actualizar(obj: Funcionalidad, res: Response) {
    try {
      // Verificar si la funcionalidad existe
      const exists = await pool.oneOrNone(sql_funcionalidad.getById, [obj.codFuncionalidad]);
      if (!exists) {
        return res.status(404).json({
          status: "error",
          message: "La funcionalidad no existe"
        });
      }

      // Verificar si la funcionalidad padre existe (si no es raíz)
      if (obj.codPadreFuncionalidad !== null) {
        const parentExists = await pool.oneOrNone(sql_funcionalidad.getById, [obj.codPadreFuncionalidad]);
        if (!parentExists) {
          return res.status(404).json({
            status: "error",
            message: "La funcionalidad padre no existe"
          });
        }
      }

      // Verificar si ya existe una funcionalidad con el mismo nombre
      const nombreExists = await pool.oneOrNone(
        sql_funcionalidad.getByNameExcludingId,
        [obj.nombreFuncionalidad, obj.codFuncionalidad]
      );

      if (nombreExists) {
        return res.status(400).json({
          status: "error",
          message: "Ya existe otra funcionalidad con ese nombre"
        });
      }

      // Verificar si ya existe una funcionalidad con la misma URL
      const urlExists = await pool.oneOrNone(
        sql_funcionalidad.getByUrlExcludingId,
        [obj.urlFuncionalidad, obj.codFuncionalidad]
      );

      if (urlExists) {
        return res.status(400).json({
          status: "error",
          message: "Ya existe otra funcionalidad con esa URL"
        });
      }

      // Actualizar la funcionalidad
      await pool.none(sql_funcionalidad.update, [
        obj.codFuncionalidad,
        obj.codPadreFuncionalidad,
        obj.nombreFuncionalidad,
        obj.urlFuncionalidad
      ]);

      res.status(200).json({
        status: "success",
        message: "Funcionalidad actualizada correctamente"
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al actualizar la funcionalidad",
        detail: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  }
}

export default ServiceFunctionalityUpdate;
