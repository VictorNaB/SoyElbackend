import { Request, Response } from "express";
import ServicioActualizarRelTurnoUsuario from "../service/ServicioActualizarRelTurnoUsuario";
import Relacion_Turno_Usuario from "../model/Rel_Turno_Usuario";


class ControladorActualizarRelTurnoUsuario extends ServicioActualizarRelTurnoUsuario{
    public llamarActualizar(req:Request,res:Response):void{
        console.log(req.body);
        const ObjTemporal= new Relacion_Turno_Usuario(0,0,0);
        ObjTemporal.CodTurnoUsuario=req.body.CodTurnoUsuario;
        ObjTemporal.CodTurno=req.body.CodTurno;
        ObjTemporal.CodUsuario=req.body.CodUsuario;
        ServicioActualizarRelTurnoUsuario.ActualizarRelTurnoUsuario(ObjTemporal,res);

    }
}

const controladorActualizarRelTurnoUsuario= new ControladorActualizarRelTurnoUsuario();
export default controladorActualizarRelTurnoUsuario;