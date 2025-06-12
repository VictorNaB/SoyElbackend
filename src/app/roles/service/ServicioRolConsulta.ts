<<<<<<< HEAD
import  { Response} from "express"; 
import pool from "../../../config/connection/dbConnetions";
import { sql_roles } from "../repository/Sql_rol";

class ServicioRolConsulta{
    protected static async obtenerTodos(res: Response):Promise<any>{
        await pool
        .result(sql_roles.FIND_ALL)
        .then((misDatos)=>{
            res.status(200).json(misDatos.rows);
        }).catch((miError)=>{
            console.log(miError);
            res.status(400).json({Respuesta: "Se totio el SQL mano"});
        });

        
    }
}

export default  ServicioRolConsulta;
=======
import { Response } from "express"; 
import pool from "../../../config/connection/dbConnetions";
import { sql_roles } from "../repository/Sql_rol";

class ServicioRolConsulta {
    protected static async obtenerTodos(res: Response): Promise<any> {
        try {
            const roles = await pool.result(sql_roles.FIND_ALL);
            
            res.status(200).json({
                status: "success",
                message: "Roles obtenidos correctamente",
                data: roles.rows
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: "Error al obtener los roles",
                detail: error instanceof Error ? error.message : "Error desconocido"
            });
        }
    }
}

export default ServicioRolConsulta;
>>>>>>> 62f9d91 (Cambios realizados)
