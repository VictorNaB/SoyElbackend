import { Request, Response } from "express";
import ServicioConsultarTurno from "../service/ServicioConsutarTurno";

class ControladorConsultarTurno extends ServicioConsultarTurno{
    
    public llamarConsultarTurno(req:Request, res:Response):void{
        ServicioConsultarTurno.ConsultarTurno(res);
    }

}

const controladorConsultarTurno=new ControladorConsultarTurno();
export default controladorConsultarTurno;