import { Response } from "express";
<<<<<<< HEAD
import Turnos from "../model/Turnos";
import pool from "../../../config/connection/dbConnetions";
import { sql_Turnos } from "../repository/Sql_Turnos";


class ServicioActualizarTurno{
    protected static async ActualizarTurno(obj:Turnos, res:Response){
        await pool.task(async(consulta)=>{
            let caso=1;
            let ObjActualizado:any;
            const Turno=await consulta.one(sql_Turnos.HOW_MANY,[obj.CodTurno]);
            if (Turno.cantidad){
                caso=2;
                ObjActualizado= await consulta.result(sql_Turnos.UPDATE,[obj.CodTurno,obj.CodParqueadero, obj.DescripcionTurno,obj.FechaTurno,obj.HoraInicio,obj.HoraFin]);
            }
            return {caso, ObjActualizado};
        }).then(({caso,ObjActualizado})=>{
            switch (caso) {
                case 1:
                    res.status(400).json({respuesta:"El turno no existe"});                    
                    break;
                case 2:
                    res.status(200).json({respuesta:"Turno Actualizado",ObjActualizado});
                    break;
            
                default:
                    break;
            }
            
        }).catch((mierror)=>{
            console.log(mierror);
            res.status(400).json({respuesta:"Ta malo"});
        })

    }


=======
import Turno from "../model/Turno";
import pool from "../../../config/connection/dbConnetions";
import { SQL_TURNO } from "../repository/sql_turno";


class ServicioActualizarTurno{
    protected static async Actualizar(obj:Turno,res:Response):Promise<any>{
        await pool.task(async(consulta)=>{
            let caso=1;
            let objActualizado:any;
            const Turno= await consulta.one(SQL_TURNO.HOW_MANY2,[obj.CodTurno]);
            if (Turno.cantidad) {
                caso=2;
                objActualizado= await consulta.result(SQL_TURNO.UPDATE,[obj.CodTurno,obj.CodParqueadero,obj.DescripcionTurno,obj.FechaTurno,obj.HoraInicioTurno,obj.HoraFinTurno]);
            }
            return {caso,objActualizado};
        }).then(({caso,objActualizado})=>{
            switch (caso) {
                case 1:
                    res.status(400).json({respuesta:"Vale mia eso ya esta"})
                    break;

                case 2:
                    res.status(200).json({objActualizado});
                    break;
            
                default:

                    break;
            }
        }).catch((mierror)=>{
            console.log(mierror);
            res.status(400).json({respuesta:"Mano eso no sirvio"})
        });
    }

>>>>>>> 62f9d91 (Cambios realizados)
}

export default ServicioActualizarTurno;