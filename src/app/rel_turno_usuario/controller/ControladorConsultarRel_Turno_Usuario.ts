import { Request, Response } from "express";
import ServicioConsultarTurnoUsuario from "../service/ServicioConsultarTurnoUsuario";


class ControladorConsultarRel_Turno_Usuario extends ServicioConsultarTurnoUsuario{
    public llamarConsultarTurnoUsuario(req:Request,res:Response):void{
        ServicioConsultarTurnoUsuario.consultarTurnoUsuario(res);
    }

}

const controladorConsultarRel_Turno_Usuario= new ControladorConsultarRel_Turno_Usuario();   
export default controladorConsultarRel_Turno_Usuario;
