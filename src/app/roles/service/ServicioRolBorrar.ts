<<<<<<< HEAD
import { Response } from "express";
import Rol from "../model/Rol";
=======
import { Request, Response } from "express";
>>>>>>> 62f9d91 (Cambios realizados)
import pool from "../../../config/connection/dbConnetions";
import { sql_roles } from "../repository/Sql_rol";

class ServicioRolBorrar {
<<<<<<< HEAD
  protected static async borrar(obj: Rol, res: Response): Promise<any> {
    await pool
      .task((consulta) => {
        return consulta.result(sql_roles.DELETE, [obj.codRol]);
      })
      .then((respuesta) => {
        res
          .status(200)
          .json({
            respuesta: "Ya lo borre",
            "filas Borradas": respuesta.rowCount,
          });
      })
      .catch((mierror) => {
        console.log(mierror);
        res.status(400).json({ respuesta: "error eliminando" });
      });
=======
  public async borrar(req: Request, res: Response): Promise<Response> {
    try {
      const { codRol } = req.params;

      // Verificar si el rol existe
      const rolExistente = await pool.oneOrNone(sql_roles.FIND_BY_ID, [codRol]);
      if (!rolExistente) {
        return res.status(404).json({
          status: "error",
          message: "El rol no existe"
        });
      }

      // Verificar si tiene usuarios asociados
      const usuariosAsociados = await pool.one(sql_roles.HOW_MANY_USERS, [codRol]);
      if (usuariosAsociados.cantidad > 0) {
        return res.status(400).json({
          status: "error",
          message: "No se puede eliminar el rol: tiene usuarios asociados"
        });
      }

      // Verificar si tiene funcionalidades asociadas
      const funcionalidadesAsociadas = await pool.one(sql_roles.HOW_MANY_FUNCTIONALITIES, [codRol]);
      if (funcionalidadesAsociadas.cantidad > 0) {
        return res.status(400).json({
          status: "error",
          message: "No se puede eliminar el rol: tiene funcionalidades asociadas"
        });
      }

      // Si no tiene relaciones, proceder a eliminar
      const resultado = await pool.result(sql_roles.DELETE, [codRol]);
      if (resultado.rowCount === 0) {
        return res.status(404).json({
          status: "error",
          message: "El rol no existe"
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Rol eliminado correctamente"
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        message: "Error al eliminar el rol",
        detail: error instanceof Error ? error.message : "Error de eliminación"
      });
    }
>>>>>>> 62f9d91 (Cambios realizados)
  }
}

export default ServicioRolBorrar;
