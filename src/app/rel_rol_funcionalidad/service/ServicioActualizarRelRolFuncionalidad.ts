import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import SQL_REL_ROL_FUNCIONALIDAD from "../repository/sql_rel_rol_funcionalidad";
import Rel_rol_funcionalidad from "../model/Rel_rol_funcionalidad";

class ServicioActualizarRelRolFuncionalidad {
  protected static async actualizar(
    oldRel: Rel_rol_funcionalidad,
    newRel: Rel_rol_funcionalidad,
    res: Response
  ): Promise<any> {
    await pool
      .task(async (consulta) => {
        // Verificar si la relación existe
        const existe = await consulta.one(
          SQL_REL_ROL_FUNCIONALIDAD.verifyExists,
          [oldRel.cod_rol, oldRel.cod_funcionalidad]
        );

        if (existe.cantidad === "0") {
          return { caso: 1, oldRel };
        }

        // Verificar si la nueva relación ya existe (si es diferente a la actual)
        if (
          oldRel.cod_rol !== newRel.cod_rol ||
          oldRel.cod_funcionalidad !== newRel.cod_funcionalidad
        ) {
          const existeNueva = await consulta.one(
            SQL_REL_ROL_FUNCIONALIDAD.verifyExists,
            [newRel.cod_rol, newRel.cod_funcionalidad]
          );

          if (existeNueva.cantidad !== "0") {
            return { caso: 2, newRel };
          }
        }

        // Actualizar la relación
        const relActualizada = await consulta.one(
          SQL_REL_ROL_FUNCIONALIDAD.update,
          [
            newRel.cod_rol,
            newRel.cod_funcionalidad,
            oldRel.cod_rol,
            oldRel.cod_funcionalidad,
          ]
        );

        return { caso: 3, relActualizada };
      })
      .then(({ caso, oldRel, newRel, relActualizada }) => {
        switch (caso) {
          case 1:
            return res.status(404).json({
              respuesta:
                "La relación rol-funcionalidad que intenta actualizar no existe",
              detalles: oldRel,
            });
          case 2:
            return res.status(400).json({
              respuesta:
                "Ya existe una relación con el nuevo rol y funcionalidad",
              detalles: newRel,
            });
          case 3:
            res.status(200).json({
              Respuesta: "Actualizado",
              Detalle: relActualizada.rowCount,
            });
            break;
          default:
            return res.status(500).json({ respuesta: "Caso no manejado" });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          respuesta: "Error al actualizar la relación rol-funcionalidad",
          error: error.message || "Error desconocido",
        });
      });
  }
}

export default ServicioActualizarRelRolFuncionalidad;
