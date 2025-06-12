import { Request,Response } from "express";
import ServicioEliminarTurno from "../service/ServicioEliminarTurno"
import Turno from "../model/Turnos";

class ControladorEliminarTurno extends ServicioEliminarTurno{
    public llamarEliminarTurno(req:Request,res:Response):void{
        const codigo=Number(req.params.CodTurno);   
        const objeliminado=new Turno(codigo,0,"","","","");
        ServicioEliminarTurno.Eliminar(objeliminado,res);

    }
}

const controladorEliminarTurno=new ControladorEliminarTurno();  
export default controladorEliminarTurno;