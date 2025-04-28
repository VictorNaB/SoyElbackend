import { Request, Response } from "express";
import ServicioActualizarRel_Turno_Usuario from "../service/ServicioActualizarRel_Turno_Usuario";
import rel_turno_usuario from "../model/Rel_Turno_Usuario";


class ControladorActualizarRel_Turno_Usuario extends ServicioActualizarRel_Turno_Usuario{
    public ActualizarTurnoUsuario(req:Request,res:Response):void{
        const Objtemporal=new rel_turno_usuario(0,0,0);
        Objtemporal.CodTurnoUsuario=req.body.CodTurnoUsuario;
        Objtemporal.CodTurno=req.body.CodTurno;
        Objtemporal.CodUsuario=req.body.CodUsuario;
        ServicioActualizarRel_Turno_Usuario.ActualizarTurnoUsuario(Objtemporal,res);
    }

}


const controladorActualizarRel_Turno_Usuario = new ControladorActualizarRel_Turno_Usuario();
export default controladorActualizarRel_Turno_Usuario;


