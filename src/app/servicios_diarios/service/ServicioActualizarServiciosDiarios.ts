import { json, Response } from "express";
import Ser_Diarios from "../model/Ser_Diarios";
import pool from "../../../config/connection/dbConnetions";
import { Sql_ServiciosDiarios } from "../repository/Sql_ServiciosDiarios";

<<<<<<< HEAD

class ServicioActualizarServiciosDiarios{
    protected static async Actualizar(obj:Ser_Diarios,res:Response):Promise<any>{
        await pool.task(async(consulta)=>{
            let caso=1;
            let objCre:any;
            const ServicioDiario= await consulta.one(Sql_ServiciosDiarios.HOW_MANY,[obj.CodServicioDiarios]);
            if (ServicioDiario.cantidad) {
                caso=2;
                objCre= await consulta.result(Sql_ServiciosDiarios.UPDATE,[obj.CodServicioDiarios,obj.CodParqueadero,obj.CodVehiculo,obj.CodPuesto,obj.FechaInicio,obj.FechaFin,obj.ValorDiario]);

            }
            return {caso,objCre};

        }).then(({caso,objCre})=>{
            switch (caso) {
                case 1:
                    res.status(400).json({respuesta:"Vale mia eso ya esta"})
                    break;
            
                default:
                    res.status(200).json({objCre});
                    break;
            }



        }).catch((mierror)=>{
            console.log(mierror);
            res.status(400).json({respuesta:"Mano eso no sirvio"})

        });
    }

=======
class ServicioActualizarServiciosDiarios {
  protected static async Actualizar(
    obj: Ser_Diarios,
    res: Response
  ): Promise<any> {
    await pool
      .task(async (consulta) => {
        let caso = 1;
        let objCre: any;

        // Verificamos si el vehículo existe
        const vehiculoExiste = await consulta.oneOrNone(
          Sql_ServiciosDiarios.FIND_BY_VEHICULO,
          [obj.CodVehiculo]
        );

        if (!vehiculoExiste || vehiculoExiste.cantidad == 0) {
          caso = 3;
          return {caso}; // Caso 3: Vehículo no existe
        }

        // Verificamos si el parqueadero existe
        const parqueaderoExiste = await consulta.oneOrNone(
          Sql_ServiciosDiarios.FIND_BY_PARQUEADERO,
          [obj.CodParqueadero]
        );

        if (!parqueaderoExiste || parqueaderoExiste.cantidad === 0) {
          caso = 4;
          return {caso}; // Caso 4: Parqueadero no existe
        }

        // Verificamos si el puesto existe y pertenece al parqueadero
        const puestoExiste = await consulta.oneOrNone(
          Sql_ServiciosDiarios.FIND_BY_PUESTO2,
          [obj.CodPuesto, obj.CodParqueadero]
        );

        if (!puestoExiste) {
          caso = 5;
          return {caso}; // Caso 5: Puesto no existe o no pertenece al parqueadero
        }

        // Si todas las validaciones pasan, continuamos con la actualización
        const ServicioDiario = await consulta.one(
          Sql_ServiciosDiarios.HOW_MANY,
          [obj.CodServicioDiarios]
        );
        if (ServicioDiario.cantidad) {
          caso = 2;
          objCre = await consulta.result(Sql_ServiciosDiarios.UPDATE, [
            obj.CodServicioDiarios,
            obj.CodParqueadero,
            obj.CodVehiculo,
            obj.CodPuesto,
            obj.FechaInicio,
            obj.FechaFin,
            obj.ValorDiario,
          ]);
        }
        return { caso, objCre };
      })
      .then(({ caso, objCre }) => {
        switch (caso) {
          case 1:
            res.status(400).json({ respuesta: "Vale mia eso ya esta" });
            break;
          case 3:
            res.status(400).json({ respuesta: "El vehículo no existe en la base de datos" });
            break;
          case 4:
            res.status(400).json({ respuesta: "El parqueadero no existe en la base de datos" });
            break;
          case 5:
            res.status(400).json({ respuesta: "El puesto no existe o no pertenece al parqueadero especificado" });
            break;
          default:
            res.status(200).json({ objCre });
            break;
        }
      })
      .catch((miError) => {
        console.error("Error al actualizar el servicio diario:", miError);
        res.status(500).json({ respuesta: "Error interno del servidor" });
      });
  }
>>>>>>> 62f9d91 (Cambios realizados)
}

export default ServicioActualizarServiciosDiarios;