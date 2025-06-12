import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { SQL_INGRESO_SERVIVIO_OTRO } from "../repository/sql_ingreso_servicio_otro";

class ServicioIngresoServicioOtroConsulta
{
    protected static async obtenerTodos(res: Response) : Promise <any>
    {
        pool.result(SQL_INGRESO_SERVIVIO_OTRO.FIND_ALL).then((misDatos)=>
        {
            res.status(200).json(misDatos.rows);
        }).catch((miError)=>
        {
            console.log(miError);
            res.status(400).json({Respuesta: "Algo salio mal"});
        });
    }
}
export default ServicioIngresoServicioOtroConsulta;