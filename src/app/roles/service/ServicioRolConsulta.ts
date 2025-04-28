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