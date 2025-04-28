import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { sql_puesto } from "../repository/Sql_Puesto";
import Puesto from "../model/Puesto";


class ServicioPuestoCrear{

    protected static async CrearPuesto(obj: Puesto, res:Response):Promise<any>{
        await pool.task(async(consulta)=>{
            let caso=1;
            let objCreado:any;
            const Puestos= await consulta.one(sql_puesto.HOW_MANY,[obj.detallePuesto]);
            if(Puestos.cantidad==0){
                caso=2;
                objCreado= await consulta.one(sql_puesto.ADD,[obj.CodParqueadero,obj.CodTipoVehiculo,obj.detallePuesto]);
            }
            return {caso,objCreado}
        }).then(({caso, objCreado})=>{
            switch (caso) {
                case 1:
                    res.status(400).json({respuesta:"Vale mia eso ya esta"})
                    break;
            
                default:
                    res.status(200).json({objCreado})
                    break;
            }

        }).catch((mierror)=>{
            console.log(mierror);
            res.status(400).json({respuesta:"Eso no sirvio compae"})
        });
    }

}

export default ServicioPuestoCrear;