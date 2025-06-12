import { Request, Response } from "express";
import IngresoServicioOtro from "../model/IngresoServicioOtro";
import ServicioIngresoServicioOtroActualizar from "../service/ServicioIngresoServicioOtroActualizar";

class ConytroladorIngresoServicioOtroActualizar extends ServicioIngresoServicioOtroActualizar {
    public actualizar(req: Request, res: Response): void {
        const objTemporal = new IngresoServicioOtro(0,0,0,new Date,new Date);
        objTemporal.codIngresoServicioOtro = req.body.codIngresoServicioOtro;
        objTemporal.codServicioOtro  = req.body.codServicioOtro;
        objTemporal.codPuesto = req.body.codPuesto;
        objTemporal.fechaIngresoServicioOtro = req.body.fechaIngresoServicioOtro;
        objTemporal.fechaSalidaServicioOtro = req.body.fechaSalidaServicioOtro;
        console.log(objTemporal);
        ServicioIngresoServicioOtroActualizar.actualizarIngresoServicioOtro(objTemporal,res);
        
    }
}
const controladorIngresoServicioOtroActualizar = new ConytroladorIngresoServicioOtroActualizar();
export default controladorIngresoServicioOtroActualizar;    