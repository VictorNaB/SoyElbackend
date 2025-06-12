import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { sql_roles } from "../repository/Sql_rol";
import Rol from "../model/Rol";

<<<<<<< HEAD

class ServicioRolCrear {
  protected static async grabarRol(obj: Rol, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        let caso = 1;
        let objGrabado:any;
        const roles = await consulta.one(sql_roles.HOW_MANY,[obj.nombreRol]);
        if(roles.cantidad == 0){
            caso = 2;
            objGrabado = await consulta.one(sql_roles.ADD,[obj.nombreRol])
        }
        return {caso,objGrabado}
      })
      .then(({caso,objGrabado})=>{
        switch (caso) {
            case 1:
                res.status(400).json({respuesta:'Ya se encuentra retido ese nombre de rol'})
                break;
            default:
                res.status(200).json({objGrabado})
                break;
        }
      })
      .catch((miError) => {
        console.log(miError);
        res.status(400).json({ respuesta: "Error al obtener rol" });
      });
  }
}
=======
class ServicioRolCrear {
  protected static async grabarRol(obj: Rol, res: Response): Promise<any> {
    try {
      // Verificar si el nombre del rol está vacío
      if (!obj.nombreRol || obj.nombreRol.trim() === '') {
        return res.status(400).json({
          status: "error",
          message: "El nombre del rol no puede estar vacío"
        });
      }

      // Verificar si ya existe un rol con el mismo nombre
      const roles = await pool.one(sql_roles.HOW_MANY, [obj.nombreRol]);
      
      if (roles.cantidad > 0) {
        return res.status(400).json({
          status: "error",
          message: "Ya existe un rol con ese nombre"
        });
      }

      // Crear el nuevo rol
      const objGrabado = await pool.one(sql_roles.ADD, [obj.nombreRol]);
      
      res.status(201).json({
        status: "success",
        message: "Rol creado correctamente",
        data: objGrabado
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al crear el rol",
        detail: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  }
}

>>>>>>> 62f9d91 (Cambios realizados)
export default ServicioRolCrear;