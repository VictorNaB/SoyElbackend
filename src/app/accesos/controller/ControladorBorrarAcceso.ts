import { Request, Response } from "express";
import Accesos from "../model/Accesos";
import ServicioBorrarAcceso from "../service/ServicioBorrarAcceso";

class ControllerAccessDelete extends ServicioBorrarAcceso {
    public Borrar(req:Request, res:Response):void{
        const objTemporal: Accesos = new Accesos(parseInt(req.params.codUsuario),"","","");
        ServicioBorrarAcceso.BorrarAcceso(objTemporal, res);
    }
}
const controladorBorrarAcceso=new ControllerAccessDelete();
export default controladorBorrarAcceso;