import { Response } from "express";
import Relacion_Turno_Usuario from "../model/Rel_Turno_Usuario";
import pool from "../../../config/connection/dbConnetions";
import { sql_rel_turno_usuario } from "../repository/Sql_Turno_Usuario";


class ServicioActualizarRelTurnoUsuario{

    protected static async ActualizarRelTurnoUsuario(obj: Relacion_Turno_Usuario, res:Response):Promise<any>{
        await pool.task(async(consulta)=>{
            let caso=1;
            let objActualizado:any;
            const RelTurnoUsuario= await consulta.one(sql_rel_turno_usuario.HOW_MANY2,[obj.CodTurnoUsuario]);
            
            if(RelTurnoUsuario.cantidad==0){
                caso=3;
                return {caso};
            }


            if(RelTurnoUsuario.cantidad){
                caso=2;
                objActualizado= await consulta.result(sql_rel_turno_usuario.UPDATE,[obj.CodTurnoUsuario,obj.CodTurno,obj.CodUsuario]);
            }
            return {caso,objActualizado}
        }).then(({caso, objActualizado})=>{
            switch (caso) {
                case 1:
                    res.status(400).json({respuesta:"Vale mia eso ya esta"})
                    break;
                case 2:
                    res.status(200).json({objActualizado: objActualizado.rowCount})
                    break;
                case 3:
                    res.status(400).json({respuesta:"No existe esa relacion, no se puede actualizar"});
                    break;
                default:
                    break;
            }

        }).catch((mierror)=>{
            console.log(mierror);
            res.status(400).json({respuesta:"Eso no sirvio compae"})
        });
    }
}

export default ServicioActualizarRelTurnoUsuario;