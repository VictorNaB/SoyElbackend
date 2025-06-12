import { Response } from "express";
import Funcionalidad from "../model/Funcionalidad";
import pool from "../../../config/connection/dbConnetions";
import { sql_funcionalidad } from "../repository/Sql_Funcionalidad";

class ServicioCrearFuncionalidad {
  protected static async Crear(obj: Funcionalidad, res: Response) {
    await pool
      .task(async (consulta) => {
        // Si tiene un padre funcionalidad, verificar que exista
        if (obj.codPadreFuncionalidad) {
          const padreExiste = await consulta.oneOrNone(
            sql_funcionalidad.getById,
            [obj.codPadreFuncionalidad]
          );

          if (!padreExiste) {
            return {
              caso: 1,
              mensaje: "La funcionalidad padre no existe en la base de datos"
            };
          }
        }

        // Verificar si ya existe una funcionalidad con el mismo nombre
        const nombreExiste = await consulta.oneOrNone(
          sql_funcionalidad.getByName,
          [obj.nombreFuncionalidad]
        );

        if (nombreExiste) {
          return {
            caso: 2,
            mensaje: "Ya existe una funcionalidad con ese nombre"
          };
        }

        // Verificar si ya existe una funcionalidad con la misma URL
        const urlExiste = await consulta.oneOrNone(
          sql_funcionalidad.getByUrl,
          [obj.urlFuncionalidad]
        );

        if (urlExiste) {
          return {
            caso: 3,
            mensaje: "Ya existe una funcionalidad con esa URL"
          };
        }

        try {
          // Crear la funcionalidad
          const result = await consulta.one(sql_funcionalidad.create, [
            obj.codPadreFuncionalidad,
            obj.nombreFuncionalidad,
            obj.urlFuncionalidad,
          ]);

          return {
            caso: 4,
            result
          };
        } catch (error) {
          console.error("Error al crear la funcionalidad:", error);
          return {
            caso: 5,
            mensaje: "Error al crear la funcionalidad en la base de datos"
          };
        }
      })
      .then(({ caso, result, mensaje }) => {
        switch (caso) {
          case 1:
          case 2:
          case 3:
          case 5:
            res.status(404).json({
              status: "error",
              message: mensaje
            });
            break;
          case 4:
            res.status(201).json({
              status: "success",
              message: "Funcionalidad creada correctamente",
              data: result
            });
            break;
        }
      })
      .catch((error) => {
        console.error(error);

        if (error.code === "23503") {
          return res.status(404).json({
            status: "error",
            message: "Error: La funcionalidad padre no existe",
            detail: error.detail
          });
        }

        return res.status(500).json({
          status: "error",
          message: "Error al crear la funcionalidad",
          detail: error.message
        });
      });
  }
}

export default ServicioCrearFuncionalidad;