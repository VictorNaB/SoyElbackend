import { Request, Response } from "express";
import ServicioEliminarTurnoUsuario from "../service/ServicioEliminarRelTurnoUsuario";
import Relacion_Turno_Usuario from "../model/Rel_Turno_Usuario";


class ControladorEliminarTurnoUsuario extends ServicioEliminarTurnoUsuario{
    public llamarEliminar(req:Request, res:Response):void{
        const codigo=Number(req.params.CodTurnoUsuario);
        const objt=new Relacion_Turno_Usuario(codigo,0,0);
        ServicioEliminarTurnoUsuario.EliminarTurnoUsuario(objt,res);
    }
}

const controladorEliminarTurnoUsuario= new ControladorEliminarTurnoUsuario();
export default controladorEliminarTurnoUsuario;