import { Request, Response } from "express";
<<<<<<< HEAD
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
=======
import Turno from "../model/Turno";
import ServicioActualizarTurno from "../service/ServicioActualizarTurno"


class ControladorActualizarTurno extends ServicioActualizarTurno{
    public actualizarTurno(req: Request, res: Response): void {
        const objTemporal = new Turno(0, 0,"",new Date(),"","");
        objTemporal.CodTurno = req.body.CodTurno;
        objTemporal.CodParqueadero = req.body.CodParqueadero;
        objTemporal.DescripcionTurno = req.body.DescripcionTurno;
        objTemporal.FechaTurno = req.body.FechaTurno;
        objTemporal.HoraInicioTurno = req.body.HoraInicioTurno;
        objTemporal.HoraFinTurno = req.body.HoraFinTurno;
        console.log(objTemporal);
        console.log(objTemporal);
        ServicioActualizarTurno.Actualizar(objTemporal, res);
    }

}


const controladorActualizarTurno = new ControladorActualizarTurno();
>>>>>>> 62f9d91 (Cambios realizados)
export default controladorActualizarTurno;