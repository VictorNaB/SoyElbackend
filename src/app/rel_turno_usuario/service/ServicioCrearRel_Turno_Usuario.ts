import { Response } from "express";
import rel_turno_usuario from "../model/Rel_Turno_Usuario";
import pool from "../../../config/connection/dbConnetions";
import { sql_rel_turno_usuario } from "../repository/Sql_Rel_Turno_Usuario";


class ServicioCrearRel_Turno_Usuario{
    protected static async crearTurnoUsuario(obj:rel_turno_usuario, res:Response){
        await pool.task(async(consulta)=>{
            let caso=1;
            let objCreado:any;
            const TurnoUsuario= await consulta.one(sql_rel_turno_usuario.HOW_MANY,[obj.CodTurno]);
            if(TurnoUsuario.cantidad==0){
                caso=2;
                objCreado= await consulta.one(sql_rel_turno_usuario.ADD,[obj.CodTurno,obj.CodUsuario]);

            }

            return {caso,objCreado};


        }).then(({caso,objCreado})=>{
            switch (caso) {
                case 1:
                    res.status(400).json({respuesta:"Vale mia eso ya esta"});
                    break;
                case 2:
                    res.status(200).json({objCreado});
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

export default ServicioCrearRel_Turno_Usuario;