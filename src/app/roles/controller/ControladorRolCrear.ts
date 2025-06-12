import { Request, Response } from "express";
import Rol from "../model/Rol";
import ServicioRol from "../service/ServicioRolCrear";

class ControladorRolCrear extends ServicioRol{

    public llamargrabarRol(req: Request, res:Response):void{
        const objTemporal= new Rol(0,"");
        objTemporal.nombreRol=req.body.nombreRol;
        ServicioRol.grabarRol(objTemporal, res);
    }

}

const controladorRolCrear= new ControladorRolCrear();
export default controladorRolCrear;