import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import Ingreso from "../model/Ingreso";
import { SQL_INGRESO } from "../repository/sql_ingreso";

class ServicioIngresoActualizar {
  protected static async actualizarIngreso(
    objIngreso: Ingreso,
    res: Response
  ): Promise<any> {
    await pool
      .task(async (consulta) => {
        let caso = 1;
        let objActualizado: any;

        const ingresos = await consulta.one(SQL_INGRESO.HOW_MANY, [
          objIngreso.fechaIngreso,
          objIngreso.horaIngreso,
        ]);

        if (ingresos.cantidad == 0) {
          caso = 2;
          objActualizado = await consulta.result(SQL_INGRESO.UPDATE, [
            objIngreso.codUsuario,
            objIngreso.fechaIngreso,
            objIngreso.horaIngreso,
            objIngreso.codIngreso,
          ]);
        }
        return { caso, objActualizado };
      })
      .then(({ caso, objActualizado }) => {
        switch (caso) {
          case 1:
            res.status(400).json({ Respuesta: "ya existe" });
            break;
          case 2:
            if (objActualizado.rowCount == 0) {
              return res.status(404).json({
                Respuesta: "No se encontró el ingreso a actualizar",
              });
            }
            res.status(200).json({
              Respuesta: "Actualizado",
              Detalle: objActualizado.rowCount,
            });
            break;
        }
      })
      .catch((miError) => {
        if (miError.code === "23503") {
          return res.status(400).json({
            Respuesta: "No existe el usuario " + objIngreso.codUsuario,
          });
        }

        console.error(miError);
        if (!res.headersSent) {
          return res.status(500).json({ Respuesta: "Algo salió mal" });
        }
      });
  }
}
export default ServicioIngresoActualizar;
