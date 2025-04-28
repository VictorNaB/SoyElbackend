import Rol from "../model/Rol";
import { Request, Response } from "express";
import ServicioRolBorrar from "../service/ServicioRolBorrar";

class ControladorRolBorrar extends ServicioRolBorrar{
    public llamarRolBorrar(req:Request, res:Response):void{
        const codigo= Number(req.params.codRol);
        const ObjRol= new Rol(codigo, "");
        ServicioRolBorrar.borrar(ObjRol,res)
    }

}

const controladorRolBorrar=new ControladorRolBorrar();
export default controladorRolBorrar;