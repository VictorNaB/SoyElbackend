import { Request, Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { SQL_TARIFA_DIARIA } from "../repository/sql_tarifa_diaria";
import TarifaDiaria from "../model/TarifaDiaria";

class ServicioTarifaDiariaBorrar {
    protected static async borrarTarifaDiaria(obj: TarifaDiaria, res: Response): Promise<any> {
        await pool.task(async(consulta)=>{
            let caso=0;
            let objeliminado:any;

            const existeTarifa = await consulta.oneOrNone(
                SQL_TARIFA_DIARIA.HOW_MANY,
                [obj.codParqueadero, obj.codTipoVehiculo]
            );

            if (!existeTarifa || existeTarifa.cantidad == 0) {
                caso = 1; // Caso en el que no existe la tarifa
                return { caso };
            }

            
            if (existeTarifa && existeTarifa.cantidad > 0) {
                caso = 2;
                objeliminado= await consulta.result(
                    SQL_TARIFA_DIARIA.DELETE,
                    [obj.codParqueadero, obj.codTipoVehiculo]
                );
                
            }

            return { caso, objeliminado };




        }).then(({caso,objeliminado})=>{
            switch (caso) {
                case 1:
                    res.status(400).json({ respuesta: "La tarifa diaria que intenta eliminar no existe" });
                    break;
                case 2:
                    res.status(200).json({
                        respuesta: "Tarifa diaria eliminada correctamente",
                        "filas borradas":objeliminado.rowCount,
                    });
                    break;
                default:
                    break;
            }

        }).catch((mierror)=>{
            console.log(mierror);
            res.status(500).json({ respuesta: "Error interno del servidor" });
        });

        /** 
        const { codParqueadero, codTipoVehiculo } = req.params;

        try {
            const existeTarifa = await pool.oneOrNone(
                SQL_TARIFA_DIARIA.HOW_MANY,
                [codParqueadero, codTipoVehiculo]
            );

            if (existeTarifa.cantidad === "0") {
                return res.status(404).json({
                    respuesta: "La tarifa diaria que intenta eliminar no existe",
                });
            }

            await pool.result(
                SQL_TARIFA_DIARIA.DELETE,
                [codParqueadero, codTipoVehiculo]
            );

            res.status(200).json({
                respuesta: "Tarifa diaria eliminada correctamente",
                tarifaEliminada: {
                    codParqueadero,
                    codTipoVehiculo
                }
            });
        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al eliminar la tarifa diaria"
            });
            */
        }
    }


export default ServicioTarifaDiariaBorrar;