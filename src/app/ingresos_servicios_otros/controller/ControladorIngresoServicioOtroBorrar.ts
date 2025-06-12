import { Request, Response } from "express";
import ServicioIngresoServicioOtroBorrar from "../service/ServicioIngresoServicioOtroBorrar";
import IngresoServicioOtro from "../model/IngresoServicioOtro";

class ControladorServicioOtroBorrar extends ServicioIngresoServicioOtroBorrar
{
    public borrar(req: Request,res:Response): void{
        const codigo = Number(req.params.codIngresoServicioOtro);
        const objTemporal = new IngresoServicioOtro(codigo,0,0,new Date,new Date);
        console.log(objTemporal);
        ServicioIngresoServicioOtroBorrar.borrarIngresoSErvicioOtro(objTemporal,res);
    }
}

const controladorIngresoServicioOtroBorrar = new ControladorServicioOtroBorrar();
export default controladorIngresoServicioOtroBorrar;