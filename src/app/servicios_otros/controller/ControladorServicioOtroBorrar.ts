import { Request, Response } from "express";
import ServicioOtroBorrar from "../service/ServicioOtroBorrar";
import ServicioOtro from "../model/ServicioOtro";

class ControladorServicioOtroBorrar extends ServicioOtroBorrar
{
    public servicioOtroBorrar(req: Request, res:Response ): void{
        const codigo = Number(req.params.codServicioOtro);
        const objTemporal = new ServicioOtro(codigo,0,0,new Date(),new Date(),new Date(),0);
        ServicioOtroBorrar.borrar(objTemporal,res);
    }
}
const controladorServicioOtroBorrar = new ControladorServicioOtroBorrar();
export default controladorServicioOtroBorrar;