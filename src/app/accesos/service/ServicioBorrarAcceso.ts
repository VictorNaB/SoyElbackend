import { Response } from "express";
import Accesos from "../model/Accesos";
import pool from "../../../config/connection/dbConnetions";
import { sql_Accesos } from "../repository/Sql_Accesos";

class ServicioBorrarAcceso {
  protected static async BorrarAcceso(
    obj: Accesos,
    res: Response
  ): Promise<any> {
    await pool
      .task(async (consulta) => {
        let caso = 1;
        const access: any = await consulta.oneOrNone(sql_Accesos.getById, [
          obj.codUsuario,
        ]);
        if (access == null) {
          caso = 2;
        } else {
          await consulta.none(sql_Accesos.DELETE, [obj.codUsuario]);
          caso = 1;
        }
        return { caso, obj };
      })
      .then(({ caso, obj }) => {
        switch (caso) {
          case 2:
            res
              .status(400)
              .json({ respuesta: "El acceso no existe en la base de datos" });
            break;
          default:
            res.status(200).json({
              respuesta: "Acceso eliminado correctamente",
              detalle: obj,
            });
            break;
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          respuesta: "Error al eliminar el acceso",
          detalle: error.message,
        });
      });
  }

    public static async eliminar(codUsuario: number, res: Response): Promise<void> {
        try {
            await pool.task(async (consulta) => {
                // Verificar si el acceso existe
                const acceso = await consulta.oneOrNone(sql_Accesos.getById, [codUsuario]);
                
                if (!acceso) {
                    return res.status(404).json({
                        respuesta: "No se encontró el acceso a eliminar",
                        codUsuario
                    });
                }

                // Eliminar el acceso
                const respuesta = await consulta.result(sql_Accesos.DELETE, [codUsuario]);
                
                res.status(200).json({
                    respuesta: "Acceso eliminado correctamente",
                    detalles: {
                        codUsuario,
                        filasBorradas: respuesta.rowCount
                    }
                });
            });
        } catch (error: any) {
            console.log(error);
            res.status(500).json({
                respuesta: "Error al eliminar el acceso",
                error: error.message || 'Error desconocido'
            });
        }
    }

}

export default ServicioBorrarAcceso;

