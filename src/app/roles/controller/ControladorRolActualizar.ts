import { Request, Response } from "express";
import Rol from "../model/Rol";
import ServicioRolActualizar from "../service/ServicioRolActualizar";

class ControladorRolActualizar extends ServicioRolActualizar{
    
    public llamarActualizar(req:Request, res:Response):void{
        const objetito= new Rol(0,"");
        objetito.codRol=req.body.codRol;
        objetito.nombreRol=req.body.nombreRol;
        ServicioRolActualizar.actualizarRol(objetito,res);
        
    }
}
const controladorRolActualizar=new ControladorRolActualizar();
export default controladorRolActualizar;