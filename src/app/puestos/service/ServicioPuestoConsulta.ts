import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { sql_puesto } from "../repository/Sql_Puesto";

class ServicioPuestoConsulta{
    protected static async obtenerPuestos(res:Response):Promise<any>{
        await pool
        .result(sql_puesto.FIND_ALL)
        .then((misDatos)=>{
            res.status(200).json(misDatos.rows);

        }).catch((mierror)=>{
            console.log(mierror);
            res.status(400).json({respuesta:"Conoces A yaper? Bueno ya perdiste"});
        })
    }

}

export default ServicioPuestoConsulta;