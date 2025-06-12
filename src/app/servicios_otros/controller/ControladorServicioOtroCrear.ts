import { Request, Response } from "express";
import ServicioOtro from "../model/ServicioOtro";
import ServicioOtroCrear from "../service/ServicioOtroCrear";
import ServicioConsulta from "../service/ServicioServicioOtro";

class ControladorServicioOtroCrear  extends ServicioOtroCrear{
   public crearOtroServicio(req: Request, res: Response): void {
    const objTemporal = new ServicioOtro(0,0,0,new Date(),new Date(),new Date(),0);
    objTemporal.codParqueadero = req.body.codParqueadero;
    objTemporal.codVehiculo = req.body.codVehiculo;
    objTemporal.fechaPagoServicioOtro = req.body.fechaPagoServicioOtro;
    objTemporal.fechaInicioServicioOtro = req.body.fechaInicioServicioOtro;
    objTemporal.fechaFinServicioOtro = req.body.fechaFinServicioOtro;
    objTemporal.valorServicioOtro = req.body.valorServicioOtro;
    ServicioOtroCrear.grabarServicioOtro(objTemporal,res);
    
   }
   
}
const controladorServicioOtroCrear = new ControladorServicioOtroCrear();
export default controladorServicioOtroCrear;