import { Response } from "express";
import Puesto from "../model/Puesto";
import pool from "../../../config/connection/dbConnetions";
import { sql_puesto } from "../repository/Sql_Puesto";

<<<<<<< HEAD
class ServicioPuestoActulizar{

    protected static async Actualizar(objAct:Puesto, res:Response):Promise<any>{
        await pool.task(async(consulta)=>{
            let caso=1;
            let objActualizado:any;
            const puesto= await consulta.one(sql_puesto.HOW_MANY,[objAct.codPuesto]);
            if(puesto.cantidad==0){
                caso=2;
                objActualizado= await consulta.result(sql_puesto.UPDATE,[objAct.codPuesto,objAct.CodParqueadero,objAct.CodTipoVehiculo, objAct.detallePuesto])
            }
            return{caso,objActualizado}


        }).then(({caso,objActualizado})=>{
            switch (caso) {
                case 1:
                    res.status(400).json({respuesta:"Vale mia eso ya esta",detalle:objActualizado.rowCount})
                    
                    break;
            
                default:
                    res.status(200).json({objActualizado});

                    break;
            }
        }).catch((mierror)=>{
            console.log(mierror);
            res.status(400).json({respuesta:"Compae Eso no sirve"});
        });
    }

}

export default ServicioPuestoActulizar;
=======
class ServicioPuestoActulizar {
  protected static async Actualizar(
    objAct: Puesto,
    res: Response
  ): Promise<any> {
    await pool
      .task(async (consulta) => {
        let caso = 1;
        let objActualizado: any;
        const puesto = await consulta.one(sql_puesto.HOW_MANY, [
          objAct.codPuesto,
        ]);

        if(puesto.cantidad==0){
          caso = 3;
          return { caso };
        }
        if (puesto.cantidad) {
          caso = 2;
          objActualizado = await consulta.result(sql_puesto.UPDATE, [
            objAct.codPuesto,
            objAct.CodParqueadero,
            objAct.CodTipoVehiculo,
            objAct.detallePuesto,
          ]);
        }
        return { caso, objActualizado };
      })
      .then(({ caso, objActualizado }) => {
        switch (caso) {
          case 1:
            res
              .status(400)
              .json({
                respuesta: "Vale mia eso ya esta",
                detalle: objActualizado.rowCount,
              });
            break;
          case 2:
            res.status(200).json({
              objActualizado: objActualizado.rowCount,
            });

            break;
          case 3:
            res.status(400).json({
              respuesta: "El puesto no existe",
            });
            break;

          default:

            break;
        }
      })
      .catch((miError) => {
        console.error(miError);

        

      });
  }
}

export default ServicioPuestoActulizar;
>>>>>>> 62f9d91 (Cambios realizados)
