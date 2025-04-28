import { Request, Response } from "express";
import ServicioEliminarRel_Turno_Usuario from "../service/ServicioEliminarRel_Turno_Usuario";
import rel_turno_usuario from "../model/Rel_Turno_Usuario";


class ControladorEliminarRel_Turno_Usuario extends ServicioEliminarRel_Turno_Usuario{
    public llamarEliminar(req:Request, res:Response){
        console.log("Codigo",req.params)
        const codigo=Number(req.params.CodTurnoUsuario);
        const obj=new rel_turno_usuario(codigo,0,0);
        ServicioEliminarRel_Turno_Usuario.EliminarTurnoUsuario(obj,res);
    }

}

const controladorEliminarRel_Turno_Usuario= new ControladorEliminarRel_Turno_Usuario();
export default controladorEliminarRel_Turno_Usuario;