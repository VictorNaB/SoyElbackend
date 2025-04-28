import { Request, Response } from "express";
import ServicioActualizarTurno from "../service/ServicioActualizarTurno";
import Turno from "../model/Turnos";

class ControladorActualizaeTurno extends ServicioActualizarTurno{
    public llamarActualizarTurno(req:Request,res:Response):void{
        console.log(req.body);
        const Objtemporal= new Turno(req.body.CodTurno,req.body.CodParqueadero,req.body.DescripcionTurno,req.body.FechaTurno,req.body.HoraInicio,req.body.HoraFin);
        console.log(Objtemporal);
        ServicioActualizarTurno.ActualizarTurno(Objtemporal,res);

    }
}

const controladorActualizarTurno=new ControladorActualizaeTurno();
export default controladorActualizarTurno;