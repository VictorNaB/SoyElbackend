import { Response } from "express";
import Rel_rol_funcionalidad from "../model/Rel_rol_funcionalidad";
import pool from "../../../config/connection/dbConnetions";
import SQL_REL_ROL_FUNCIONALIDAD from "../repository/sql_rel_rol_funcionalidad";

class ServicioCrearRelRolFuncionalidadCrear {
  protected static async Crear(
    obj: Rel_rol_funcionalidad,
    res: Response
  ): Promise<any> {
    await pool;
    await pool
      .task(async (consulta) => {
        let caso = 0;
        let resultado: any;
        console.log("Objeto recibido:", obj);
        // 1. Verificar si el rol existe
        const rolExiste = await consulta.one(
          SQL_REL_ROL_FUNCIONALIDAD.verifyRolExists,
          [obj.cod_rol]
        );
        if (rolExiste.cantidad == 0) {
          caso = 1; // El rol no existe
          return { caso };
        }

        // 2. Verificar si la funcionalidad existe
        const funcionalidadExiste = await consulta.one(
          SQL_REL_ROL_FUNCIONALIDAD.verifyFuncionalidadExists,
          [obj.cod_funcionalidad]
        );
        if (funcionalidadExiste.cantidad == 0) {
          caso = 2; // La funcionalidad no existe
          return { caso };
        }

        // 3. Verificar si ya existe la relación
        const relacionExiste = await consulta.one(
          SQL_REL_ROL_FUNCIONALIDAD.verifyExists,
          [obj.cod_rol, obj.cod_funcionalidad]
        );
        if (relacionExiste.cantidad != 0) {
          caso = 3; // La relación ya existe
          return { caso };
        }

        // 4. Crear la relación
        resultado = await consulta.one(SQL_REL_ROL_FUNCIONALIDAD.create, [
          obj.cod_rol,
          obj.cod_funcionalidad,
        ]);
        caso = 4; // Relación creada correctamente
        console.log("Relación creada:", resultado);

        return { caso, resultado };
      })

      .then(({ caso, resultado }) => {
        switch (caso) {
          case 1:
            res.status(404).json({
              respuesta: "No se encontró el rol en la base de datos",
              detalles: { codRol: obj.cod_rol },
            });
            break;
          case 2:
            res.status(404).json({
              respuesta: "No se encontró la funcionalidad en la base de datos",
              detalles: { codFuncionalidad: obj.cod_funcionalidad },
            });
            break;
          case 3:
            res.status(400).json({
              respuesta: "La relación rol-funcionalidad ya existe",
            });
            break;
          case 4:
            res.status(200).json({
              respuesta: "Relación rol-funcionalidad creada exitosamente",
              detalles: resultado,
            });
            break;
          default:
            return res.status(500).json({ error: "Caso no manejado" });
        }
      })

      .catch((error) => {
        if (error.code == "23503") {
          return res
            .status(400)
            .json({
              Respuesta: "No existe el rol o la funcionalidad referenciada",
            });
        }
        console.log(error);
        return res.status(500).json({ Respuesta: "Algo salio mal" });
      });
  }
}

export default ServicioCrearRelRolFuncionalidadCrear;
