import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import Vehiculo from "../model/Vehiculo";
import { SQL_VEHICULO } from "../repository/sql_vehiculo";

class ServicioVehiculoBorrar {
  public static async borrar(obj: Vehiculo, res: Response): Promise<any> {
    await pool
      .task(async(consulta) => {
        let caso=0;
        let Objeliminado: any;
        const existe= await consulta.oneOrNone(SQL_VEHICULO.FIND_BY_ID, [obj.codVehiculo]); 
        const existeServiciosDiarios = await consulta.oneOrNone(SQL_VEHICULO.FIND_BY_SERVICIOSDIARIOS, [obj.codVehiculo]);

        if(existeServiciosDiarios) {
          caso=3;
          return {caso};
        }


        if(!existe){
          caso=1;
          return {caso};
        }

        if(existe){
          caso=2;    
          Objeliminado= await consulta.result(SQL_VEHICULO.DELETE, [obj.codVehiculo]);
        }

        return { caso, Objeliminado };
      })
      .then(({caso,Objeliminado}) => {
        switch (caso) {
          case 1:
            res.status(400).json({ respuesta: "El vehículo no existe" });
            break;
          case 2:
            res.status(200).json({
              respuesta: "Vehículo eliminado correctamente",
              "Filas borradas": Objeliminado.rowCount,
            });
            break;   
          case 3:
            res.status(400).json({ respuesta: "El vehículo no se puede eliminar porque tiene servicios diarios asociados" });
            break;     
          default:
            break;
        }
      })
      .catch((miError) => {
        console.log(miError);
        res.status(400).json({ respuesta: "Error eliminando el vehículo" });
      });
  }
}
export default ServicioVehiculoBorrar;