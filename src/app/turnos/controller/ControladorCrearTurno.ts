import { Request, Response } from "express";
import Turno from "../model/Turnos";
import ServicioCrearTurno from "../service/ServicioCrearTurno";

class ControladorCrearTurno extends ServicioCrearTurno{
    public LlamarCrearTurno(req:Request,res:Response): void {
        console.log(req.body);
        const objCreado=new Turno(0,0,"","","","");
        objCreado.CodParqueadero=req.body.CodParqueadero;
        objCreado.DescripcionTurno=req.body.DescripcionTurno;
        objCreado.FechaTurno=req.body.FechaTurno;
        objCreado.HoraInicio=req.body.HoraInicio;
        objCreado.HoraFin=req.body.HoraFin;
        ServicioCrearTurno.CrearTurno(objCreado,res);
    }

}

const controladorCrearTurno = new ControladorCrearTurno();
export default controladorCrearTurno;