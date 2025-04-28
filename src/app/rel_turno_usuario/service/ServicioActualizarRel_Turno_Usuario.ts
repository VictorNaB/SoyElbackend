import { Response } from "express";
import rel_turno_usuario from "../model/Rel_Turno_Usuario";
import pool from "../../../config/connection/dbConnetions";
import { sql_rel_turno_usuario } from "../repository/Sql_Rel_Turno_Usuario";


class ServicioActualizarRel_Turno_Usuario{
    protected static async ActualizarTurnoUsuario(obj:rel_turno_usuario,res:Response):Promise<any>{
        await pool.task(async(consulta)=>{
            let caso=1;
            let objActualizado:any;
            const TurnoUsuario= await consulta.one(sql_rel_turno_usuario.HOW_MANY,[obj.CodTurnoUsuario]);
            if(TurnoUsuario.cantidad){
                caso=2;
                objActualizado= await consulta.result(sql_rel_turno_usuario.UPDATE,[obj.CodTurnoUsuario,obj.CodTurno, obj.CodUsuario]);

            }
            return {caso,objActualizado};
        }).then(({caso,objActualizado})=>{
            switch (caso) {
                case 1:
                    res.status(400).json({respuesta:"Vale mia eso no existe"}); 
                    break;
                case 2:
                    res.status(200).json({objActualizado});
                    break;
                default:
                    break;
            }
        }).catch((mierror)=>{
            console.log(mierror);
            res.status(400).json({respuesta:"Eso no sirve"});
        });
    } 
}


export default ServicioActualizarRel_Turno_Usuario;
