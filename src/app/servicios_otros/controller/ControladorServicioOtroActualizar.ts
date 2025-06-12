import { Request, Response } from "express";
import ServicioOtrosActualizar from "../service/ServicioOtroActualizar";
import ServicioOtro from "../model/ServicioOtro";

class ControladorServicioOtroActualizar extends ServicioOtrosActualizar
{
    public servicioOtroActualizar(req: Request, res:Response ): void{
        const codigo = Number(req.body.codServicioOtro);
        const objTemporal = new ServicioOtro(codigo,0,0,new Date(),new Date(),new Date(),0);
        objTemporal.codParqueadero = req.body.codParqueadero;
        objTemporal.codVehiculo = req.body.codVehiculo;
        objTemporal.fechaPagoServicioOtro = req.body.fechaPagoServicioOtro;
        objTemporal.fechaInicioServicioOtro = req.body.fechaInicioServicioOtro;
        objTemporal.fechaFinServicioOtro = req.body.fechaFinServicioOtro;
        objTemporal.valorServicioOtro = req.body.valorServicioOtro;
        ServicioOtrosActualizar.actulizar(objTemporal,res);
    }
}
const controladorServicioOtroActualizar = new ControladorServicioOtroActualizar();
export default controladorServicioOtroActualizar;