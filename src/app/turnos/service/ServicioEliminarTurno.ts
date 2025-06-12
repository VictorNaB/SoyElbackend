import { Response } from "express";
<<<<<<< HEAD
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
=======
import Turno from "../model/Turno";
import pool from "../../../config/connection/dbConnetions";
import { SQL_TURNO } from "../repository/sql_turno";
import { sql_rel_turno_usuario } from "../../rel_turno_usuario/repository/Sql_Turno_Usuario";

class ServicioEliminarTurno{
    protected static async eliminarTurno(obj:Turno, res:Response):Promise<any>{
        await pool.task(async(consulta)=>{
            let caso=0;
            let objeliminado:any;
            const turno= await consulta.oneOrNone(SQL_TURNO.HOW_MANY2,[obj.CodTurno]);
            const rel_Turno_Usuario= await consulta.any(sql_rel_turno_usuario.FIND_BY_TURNO, [obj.CodTurno]);
            if(turno.cantidad==0){
                caso=1;
                return{caso};
            }

            if(rel_Turno_Usuario.length>0){
                caso=2;
                return{caso};
            }

            objeliminado= await consulta.result(SQL_TURNO.DELETE,[obj.CodTurno]);
            caso=3;


>>>>>>> 62f9d91 (Cambios realizados)
            return {caso,objeliminado};

        }).then(({caso,objeliminado})=>{
            switch (caso) {
                case 1:
<<<<<<< HEAD
                    res.status(400).json({respuesta:"El turno no existe"})
                    break;
                case 2:
                    res.status(400).json({respuesta:"El turno tiene un usuario relacionado"})
                    break;
                case 3:
                    res.status(200).json({respuesta:"Se elimino correctamente", "filas borradas":objeliminado.rowCount});   
=======
                    res.status(400).json({respuesta:"El turno no existe"});
                    break;
                case 2:
                    res.status(400).json({respuesta:"El turno tiene un usuario relacionado"});
                    break;

                case 3:
                    res.status(200).json({respuesta:"Se elimino Correctamente", "filas borradas":objeliminado.rowCount,});
>>>>>>> 62f9d91 (Cambios realizados)
                    break;
                default:
                    break;
            }
<<<<<<< HEAD
        }).catch((mierror)=>{
            console.log(mierror);
            res.status(400).json({respuesta:"No sirve"});
        });
    }
=======

        }).catch((mierror)=>{
            console.log(mierror);
            res.status(400).json({respuesta:"Eso no sirve"});
        });
    }

>>>>>>> 62f9d91 (Cambios realizados)
}

export default ServicioEliminarTurno;