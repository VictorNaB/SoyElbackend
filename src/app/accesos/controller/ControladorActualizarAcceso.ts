import { Request, Response } from "express";
import ServicioActualizarAcceso from "../service/ServicioActualizarAcceso";
import Accesos from "../model/Accesos";

class ControladorActualizarAcceso extends ServicioActualizarAcceso {
    public Actualizar(req:Request, res:Response):void{
        const objTemporal: Accesos = new Accesos(req.body.codUsuario, req.body.correo, req.body.clave, req.body.uuid);
        ServicioActualizarAcceso.ActualizarAcceso(objTemporal, res);
    }
}
const controladorActualizarAcceso=new ControladorActualizarAcceso();
export default controladorActualizarAcceso;
