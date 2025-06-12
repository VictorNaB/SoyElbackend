import { Request, Response } from "express";
import ServicioCrearRel_Turno_Usuario from "../service/ServicioCrearRel_Turno_Usuario";
import rel_turno_usuario from "../model/Rel_Turno_Usuario";

class ControladorCrearRel_Turno_Usuario extends ServicioCrearRel_Turno_Usuario{
    public crearPuesto(req:Request,res:Response):void{
        console.log(req.body)
        const objCreado=new rel_turno_usuario(0,0,0);
        objCreado.CodTurno=req.body.CodTurno;
        objCreado.CodUsuario=req.body.CodUsuario;
        ServicioCrearRel_Turno_Usuario.crearTurnoUsuario(objCreado,res);
    }
}

const controladorCrearRel_Turno_Usuario=new ControladorCrearRel_Turno_Usuario(); 
export default controladorCrearRel_Turno_Usuario;   
