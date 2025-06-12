import { Request, Response } from "express";
import ServicioRelTurnoUsuarioCrear from "../service/ServicioRelTurnoUsuarioCrear";
import Relacion_Turno_Usuario from "../model/Rel_Turno_Usuario";


class ControladorCrearRelTurnoUsuario extends ServicioRelTurnoUsuarioCrear{
    public CrearRelTurnoUsuario(req:Request, res:Response):void{
        const ObjTemporal= new Relacion_Turno_Usuario(0,0,0);
        ObjTemporal.CodTurnoUsuario=req.body.CodTurnoUsuario;
        ObjTemporal.CodTurno=req.body.CodTurno;
        ObjTemporal.CodUsuario=req.body.CodUsuario;
        ServicioRelTurnoUsuarioCrear.CrearRelTurnoUsuario(ObjTemporal,res);
    }

}

const controladorCrearRelTurnoUsuario= new ControladorCrearRelTurnoUsuario();
export default controladorCrearRelTurnoUsuario;

