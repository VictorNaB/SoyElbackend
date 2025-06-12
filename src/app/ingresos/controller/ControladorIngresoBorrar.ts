import { Request, Response } from "express";
import ServicioIngresoBorrar from "../service/ServicioIngresoBorrar";
import Ingreso from "../model/Ingreso";

class ControladorIngresoBorrar extends ServicioIngresoBorrar {
    public borrar(req:Request,res:Response):void{
        const codigo = Number(req.params.codIngreso);
        const objIngreso = new Ingreso(codigo,0,"","");
        ServicioIngresoBorrar.borrar(objIngreso,res);
    }
}
const controladorIngresoBorrar = new ControladorIngresoBorrar();
export default controladorIngresoBorrar;
