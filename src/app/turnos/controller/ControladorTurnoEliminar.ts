import { Request, Response } from "express";
import Turno from "../model/Turno";
import ServicioEliminarTurno from "../service/ServicioEliminarTurno";


class ControladorTurnoEliminar extends ServicioEliminarTurno{
    public eliminarTurno(req: Request, res: Response): void {
        
        const codigo = Number(req.params.CodTurno);
        console.log(codigo);
        const objTemporal = new Turno(codigo, 0,"",new Date(),"","");

        ServicioEliminarTurno.eliminarTurno(objTemporal, res);
    }
}
const controladorTurnoEliminar = new ControladorTurnoEliminar();
export default controladorTurnoEliminar;