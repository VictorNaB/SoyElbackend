import { Response } from "express";
<<<<<<< HEAD
import { sql_Turnos } from "../repository/Sql_Turnos";
import Turnos from "../model/Turnos";
import pool from "../../../config/connection/dbConnetions";

class ServicioCrearTurno{
    protected static async CrearTurno(obj:Turnos, res:Response):Promise<any>{
        await pool.task(async(consulta)=>{
            let caso=1;
            let Objcreado:any;
            const Turno= await consulta.one(sql_Turnos.HOW_MANY,[obj.CodTurno]);
            if(Turno.cantidad==0){
                caso=2;
                Objcreado= await consulta.one(sql_Turnos.ADD,[obj.CodParqueadero,obj.DescripcionTurno,obj.FechaTurno,obj.HoraInicio,obj.HoraFin]);

            }
            return{caso,Objcreado};
        }).then(({caso, Objcreado})=>{
            switch (caso){
                case 1:
                    res.status(400).json({respuesta:"Eso ya existe"});
                    break;
                case 2:
                    res.status(200).json({Objcreado});
                    break;
                default:
                    break;
            }
        }).catch((mierror)=>{
            console.log(mierror);
            res.status(400).json({respuesta:"No sirve"});
        });

    }
}

export default ServicioCrearTurno;
=======
import pool from "../../../config/connection/dbConnetions";
import { SQL_TURNO } from "../repository/sql_turno";
import Turno from "../model/Turno";

class ServicioCrearTurno{
    protected static async CrearTurno(obj:Turno,res:Response):Promise<any>{
        await pool.task(async(consulta)=>{
            let caso=1;
            let objCreado:any;
            const Turno= await consulta.one(SQL_TURNO.HOW_MANY, [obj.DescripcionTurno]);
            if(Turno.cantidad==0){
                caso=2;
                objCreado= await consulta.one(SQL_TURNO.ADD,[obj.CodParqueadero,obj.DescripcionTurno,obj.FechaTurno,obj.HoraInicioTurno,obj.HoraFinTurno]);
            }
            return {caso, objCreado}
        }).then(({caso,objCreado})=>{
            switch (caso) {
                case 1:
                    res.status(400).json({respuesta:"Vale mia eso ya esta"})
                    break;
            
                default:
                    res.status(200).json({objCreado})
                    break;
            }
        }).catch((mierror)=>{
            console.log();
            res.status(400).json({respuesta:"Joaa"})
        });
    }
}

export default ServicioCrearTurno
>>>>>>> 62f9d91 (Cambios realizados)
