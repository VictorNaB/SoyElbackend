import { Response } from "express";
import Ser_Diarios from "../model/Ser_Diarios"
import pool from "../../../config/connection/dbConnetions";
import { Sql_ServiciosDiarios } from "../repository/Sql_ServiciosDiarios";

class ServicioCrearServicioDiarios{
    protected static async CrearServicio_Diario(obj:Ser_Diarios,res:Response):Promise<any>{
        await pool.task(async(consulta)=>{
<<<<<<< HEAD

            let caso=1;
            let objCreado:any;
            const ServicioDiario= await consulta.one(Sql_ServiciosDiarios.HOW_MANY, [obj.CodServicioDiarios]);
            if(ServicioDiario.cantidad==0){
                caso=2;
                objCreado= await consulta.one(Sql_ServiciosDiarios.ADD,[obj.CodParqueadero,obj.CodVehiculo,obj.CodPuesto,obj.FechaInicio,obj.FechaFin,obj.ValorDiario]);

=======
            let caso=1;
            let objCreado:any;
            
            // Verificamos si el vehículo existe
            const vehiculoExiste = await consulta.oneOrNone(
                Sql_ServiciosDiarios.FIND_BY_VEHICULO,
                [obj.CodVehiculo]
            );

            if (!vehiculoExiste || vehiculoExiste.cantidad == 0) {
                caso=3;
                return { caso}; // Caso 3: Vehículo no existe
            }

            // Verificamos si el parqueadero existe
            const parqueaderoExiste = await consulta.oneOrNone(
                Sql_ServiciosDiarios.FIND_BY_PARQUEADERO,
                [obj.CodParqueadero]
            );

            if (!parqueaderoExiste || parqueaderoExiste.cantidad == 0) {
                caso=4;
                return {caso}; // Caso 4: Parqueadero no existe
            }

            // Verificamos si el puesto existe y pertenece al parqueadero
            const puestoExiste = await consulta.oneOrNone(
                Sql_ServiciosDiarios.FIND_BY_PUESTO2,
                [obj.CodPuesto, obj.CodParqueadero]
            );

            if (!puestoExiste) {
                caso=5;
                return {caso}; // Caso 5: Puesto no existe o no pertenece al parqueadero
            }

            // Si todas las validaciones pasan, continuamos con la creación del servicio
            const ServicioDiario = await consulta.one(Sql_ServiciosDiarios.HOW_MANY, [obj.CodServicioDiarios]);
            if(ServicioDiario.cantidad==0){
                caso=2;
                objCreado= await consulta.one(Sql_ServiciosDiarios.ADD,[
                    obj.CodParqueadero,
                    obj.CodVehiculo,
                    obj.CodPuesto,
                    obj.FechaInicio,
                    obj.FechaFin,
                    obj.ValorDiario
                ]);
>>>>>>> 62f9d91 (Cambios realizados)
            }
            return {caso, objCreado}
        }).then(({caso,objCreado})=>{
            switch (caso) {
                case 1:
                    res.status(400).json({respuesta:"Vale mia eso ya esta"})
                    break;
<<<<<<< HEAD
            
=======
                case 3:
                    res.status(400).json({respuesta:"El vehículo no existe en la base de datos"})
                    break;
                case 4:
                    res.status(400).json({respuesta:"El parqueadero no existe en la base de datos"})
                    break;
                case 5:
                    res.status(400).json({respuesta:"El puesto no existe o no pertenece al parqueadero especificado"})
                    break;
>>>>>>> 62f9d91 (Cambios realizados)
                default:
                    res.status(200).json({objCreado})
                    break;
            }
<<<<<<< HEAD
        }).catch((mierror)=>{
            console.log();
            res.status(400).json({respuesta:"Joaa"})

        });

=======
        }).catch((error)=>{
            console.log(error);
            res.status(400).json({respuesta:"Tu porqueria no sirve"})
        });
>>>>>>> 62f9d91 (Cambios realizados)
    }
}

export default ServicioCrearServicioDiarios;