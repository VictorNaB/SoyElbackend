import { Request, Response } from "express";
<<<<<<< HEAD
import Accesos from "../model/Accesos";
=======
>>>>>>> 62f9d91 (Cambios realizados)
import ServicioBorrarAcceso from "../service/ServicioBorrarAcceso";

class ControllerAccessDelete extends ServicioBorrarAcceso {
    public Borrar(req:Request, res:Response):void{
<<<<<<< HEAD
        const objTemporal: Accesos = new Accesos(parseInt(req.params.codUsuario),"","","");
        ServicioBorrarAcceso.BorrarAcceso(objTemporal, res);
=======
        const codUsuario = parseInt(req.params.codUsuario);
        ServicioBorrarAcceso.eliminar(codUsuario, res);
>>>>>>> 62f9d91 (Cambios realizados)
    }
}
const controladorBorrarAcceso=new ControllerAccessDelete();
export default controladorBorrarAcceso;