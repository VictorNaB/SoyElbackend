import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
<<<<<<< HEAD
import Rol from "../model/Rol";
import { sql_roles } from "../repository/Sql_rol";

class ServicioRolActualizar{


    protected static async actualizarRol(objRol:Rol, res:Response):Promise<any>{
        await pool.task(async (consulta)=>{
            let caso=1;
            let objActualizado:any;
            const roles= await consulta.one(sql_roles.HOW_MANY, [objRol.nombreRol]);
            if(roles.cantidad==0){
                caso=2;
                objActualizado=await consulta.result(sql_roles.UPDATE,[objRol.nombreRol, objRol.codRol]);
                
            }
            return {caso, objActualizado};

        }).then(({caso, objActualizado})=>{
            switch (caso) {
                case 1:
                    res.status(400).json({respuesta:"Ya existe el rol mano"});
                    break;
            
                default:
                    res.status(200).json({respuesta:"Todo bien", detalle:objActualizado.rowCount,});
                    break;
            }
        }).catch((miError:any)=>{
            console.log(miError)
            res.status(400).json({respuesta:"Fatal error!!!"})
        });
    }

}

export default ServicioRolActualizar;
=======
import { sql_roles } from "../repository/Sql_rol";
import Rol from "../model/Rol";

class ServicioRolActualizar {
  protected static async actualizarRol(obj: Rol, res: Response): Promise<any> {
    try {
      // Verificar si el rol existe
      const rolExistente = await pool.oneOrNone(sql_roles.FIND_BY_ID, [obj.codRol]);
      
      if (!rolExistente) {
        return res.status(404).json({
          status: "error",
          message: "El rol no existe"
        });
      }

      // Verificar si el nombre del rol está vacío
      if (!obj.nombreRol || obj.nombreRol.trim() === '') {
        return res.status(400).json({
          status: "error",
          message: "El nombre del rol no puede estar vacío"
        });
      }

      // Verificar si ya existe otro rol con el mismo nombre
      const roles = await pool.one(sql_roles.HOW_MANY, [obj.nombreRol]);
      
      if (roles.cantidad > 0) {
        return res.status(400).json({
          status: "error",
          message: "Ya existe un rol con ese nombre"
        });
      }

      // Actualizar el rol
      const { rowCount } = await pool.result(sql_roles.UPDATE, [obj.nombreRol, obj.codRol]);

      if (rowCount === 0) {
        return res.status(400).json({
          status: "error",
          message: "No se pudo actualizar el rol"
        });
      }

      res.status(200).json({
        status: "success",
        message: "Rol actualizado correctamente"
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al actualizar el rol",
        detail: error instanceof Error ? error.message : "Error de actualización"
      });
    }
  }
}

export default ServicioRolActualizar;
>>>>>>> 62f9d91 (Cambios realizados)
