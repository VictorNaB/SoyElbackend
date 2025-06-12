import { Request, Response } from "express";
import ServicioCrearTurno from "../service/ServicioCrearTurno";
import Turno from "../model/Turno";


class ControladorCrearTurnos extends ServicioCrearTurno{
    public crearTurno(req: Request, res: Response): void {
        const objTemporal = new Turno(0, 0,"",new Date(),"","");
        objTemporal.CodParqueadero = req.body.CodParqueadero;
        objTemporal.DescripcionTurno = req.body.DescripcionTurno;
        objTemporal.FechaTurno = new Date(req.body.FechaTurno);
        objTemporal.HoraInicioTurno = req.body.HoraInicioTurno;
        objTemporal.HoraFinTurno = req.body.HoraFinTurno;
        console.log(objTemporal);

        ServicioCrearTurno.CrearTurno(objTemporal, res);

        
    }

}

const controladorCrearTurnos = new ControladorCrearTurnos();
export default controladorCrearTurnos;