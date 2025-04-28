import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { sql_roles } from "../repository/Sql_rol";
import Rol from "../model/Rol";


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
export default ServicioRolCrear;