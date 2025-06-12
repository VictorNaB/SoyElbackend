import { Request, Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { SQL_TARIFA_DIARIA } from "../repository/sql_tarifa_diaria";


class ServicioTarifaDiariaConsulta {
    // Obtener todas las tarifas diarias
    protected static async obtenerTodos(res: Response): Promise<any> {

        await pool.result(SQL_TARIFA_DIARIA.FIND_ALL).then((misdatos)=>{
            res.status(200).json(misdatos.rows);
        }).catch((mierror)=>{
            console.log(mierror);
            res.status(500).json({ respuesta: "Error interno al consultar tarifas diarias" });

        });
        
    }
}

export default ServicioTarifaDiariaConsulta;