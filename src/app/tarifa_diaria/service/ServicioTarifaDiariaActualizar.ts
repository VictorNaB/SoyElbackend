import { Request, Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { SQL_TARIFA_DIARIA } from "../repository/sql_tarifa_diaria";
import TarifaDiaria from "../model/TarifaDiaria";


class ServicioTarifaDiariaActualizar {
    protected static async ActualizarTarifaDiaria(obj: TarifaDiaria, res: Response): Promise<any> {
        await pool.task(async(consulta)=>{
            let caso=1;
            let objCreado:any;

            const parqueaderoExiste = await consulta.oneOrNone(SQL_TARIFA_DIARIA.VERIFY_PARQUEADERO, [obj.codParqueadero]);
            if (parqueaderoExiste.cantidad == 0) {
               caso=3;
               return {caso};
            }

            const tipoVehiculoExiste = await consulta.oneOrNone(SQL_TARIFA_DIARIA.VERIFY_TIPO_VEHICULO, [obj.codTipoVehiculo]);
            if (tipoVehiculoExiste.cantidad == 0) {
                caso=4;
                return {caso};
            }
                

            const existeTarifa = await consulta.oneOrNone(
                SQL_TARIFA_DIARIA.HOW_MANY,
                [obj.codParqueadero, obj.codTipoVehiculo]
            );

            if(!existeTarifa||existeTarifa.cantidad==0){
                caso=5;
                return {caso};
            }
    
            if(existeTarifa||existeTarifa.cantidad){
                caso=2;
                objCreado= await consulta.one(SQL_TARIFA_DIARIA.UPDATE,[obj.codParqueadero,obj.codTipoVehiculo,obj.valorTarifaDiaria]);
            }

            return { caso, objCreado };

        }).then(({caso,objCreado})=>{
            switch (caso) {
                case 2:
                    res.status(200).json({ objCreado });
                    break;
                case 3:
                    res.status(400).json({ respuesta: "El parqueadero no existe" });
                    break;
                case 4:
                    res.status(400).json({ respuesta: "El tipo de vehículo no existe" });
                    break;
                case 5:
                    res.status(400).json({ respuesta: "La tarifa diaria no existe para el parqueadero y tipo de vehículo especificados" });
                    break;
                default:
                   break;
            }

        }).catch((mierror)=>{
            console.log(mierror);
            res.status(500).json({ respuesta: "Error interno del servidor" });
        });

    }
        
}

export default ServicioTarifaDiariaActualizar;