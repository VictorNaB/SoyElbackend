import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import Ingreso from "../model/Ingreso";
import { SQL_INGRESO } from "../repository/sql_ingreso";
import Accesos from "../../accesos/model/Accesos";
import { sql_login } from "../../login/repository/Sql_Login";

class ServicioIngresoCrear {
  protected static async grabarIngresoServicioOtro(
    obj: Ingreso,
    res: Response
  ): Promise<any> {
    await pool
      .task(async (consulta) => {
        let caso = 1;
        let objGrabado: any;
        let objCodUsuario: any;
        const ingreso = await consulta.one(SQL_INGRESO.HOW_MANY, [
          obj.fechaIngreso,
          obj.horaIngreso,
        ]);
        if (ingreso.cantidad == 0) {
          caso = 2;
          objGrabado = await consulta.one(SQL_INGRESO.ADD, [
            obj.codUsuario,
            obj.fechaIngreso,
            obj.horaIngreso,
          ]);
        }
        return { caso, objGrabado };
      })
      .then(({ caso, objGrabado }) => {
        if (res.headersSent) {
          return;
        }
        switch (caso) {
          case 1:
            res.status(400).json({ Respuesta: "Error al grabar ya existe" });
            break;
          case 2:
            res.status(200).json({ Respuesta: "ingreso grabado", objGrabado });
            break;
        }
      })
      .catch((miError) => {
        if (miError.code == "23503") {
          return res
            .status(400)
            .json({ Respuesta: "no existe el usuarion " + obj.codUsuario });
        }
        console.log(miError);
        return res.status(500).json({ Respuesta: "Algo salio mal" });
      });
      
  }
}
export default ServicioIngresoCrear;
