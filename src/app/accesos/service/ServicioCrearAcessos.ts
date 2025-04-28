import { Response, Request } from "express";
import pool from "../../../config/connection/dbConnetions";
import Accesos from "../model/Accesos";
import { sql_Accesos } from "../repository/Sql_Accesos";

class ServicioCrearAccesos {
  protected static async crearAcceso(obj: Accesos, res: Response) {
    await pool
      .task(async (consulta) => {
        let caso = 1;
        let objGrabado: any;
        const usuarioExiste = await consulta.oneOrNone(
          sql_Accesos.getByUserId,
          [obj.codUsuario]
        );
        if (!usuarioExiste) {
          caso = 3;
        }else{
            const access: any = await consulta.oneOrNone(sql_Accesos.getById, [
              obj.codUsuario,
            ]);
            if (access != null) {
              caso = 2;
            }

            if(access ==  null){
              caso =4;
              objGrabado = await consulta.one(sql_Accesos.ADD, [
                obj.codUsuario,
                obj.correo,
                obj.clave,
                obj.uuid,
              ]);
          }
            }
            
        return { caso, objGrabado };
      })
      .then(({ caso, objGrabado }) => {
        switch (caso) {
          case 2:
            res
              .status(400)
              .json({ respuesta: "Ya se encuentra registrado ese usuario" });
            break;
          case 3:
            res
              .status(400)
              .json({ respuesta: "El usuario no existe en la base de datos" });
            break
          case 4:
            res.status(200).json({objGrabado});
          default:

            break;
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ respuesta: "Error al crear el acceso" });
      });
  }
}

export default ServicioCrearAccesos;
