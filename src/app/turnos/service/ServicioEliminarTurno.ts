import { Response } from "express";
import Turno from "../model/Turnos";
import pool from "../../../config/connection/dbConnetions";
import { sql_Turnos } from "../repository/Sql_Turnos";
import { sql_rel_turno_usuario } from "../../rel_turno_usuario/repository/Sql_Rel_Turno_Usuario";


class ServicioEliminarTurno{
    protected static async Eliminar(obj:Turno,res:Response):Promise<any>{
        await pool.task(async(consulta)=>{
            let caso=0;
            let objeliminado:any;
            const turno = await consulta.one(sql_Turnos.FIND_BY,[obj.CodTurno])
            if(!turno){
                caso=1;
            }

            const relTurnoUsuario= await consulta.oneOrNone(sql_rel_turno_usuario.FIND_BY_TURNO,[obj.CodTurno]);
            if(relTurnoUsuario){
                caso=2;

            }

            if(turno && !relTurnoUsuario){
                caso=3;
                objeliminado= await consulta.result(sql_Turnos.DELETE,[obj.CodTurno]);
            }
            return {caso,objeliminado};

        }).then(({caso,objeliminado})=>{
            switch (caso) {
                case 1:
                    res.status(400).json({respuesta:"El turno no existe"})
                    break;
                case 2:
                    res.status(400).json({respuesta:"El turno tiene un usuario relacionado"})
                    break;
                case 3:
                    res.status(200).json({respuesta:"Se elimino correctamente", "filas borradas":objeliminado.rowCount});   
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

export default ServicioEliminarTurno;