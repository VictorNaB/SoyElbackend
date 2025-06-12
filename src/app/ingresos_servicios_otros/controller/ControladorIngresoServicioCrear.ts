import { Request, Response } from "express";
import ServicioIngresoServicioOtroCrear from "../service/ServicioIngresoServiciosOtrosCrear";
import IngresoServicioOtro from "../model/IngresoServicioOtro";

class ControladorIngresoServicioOtroCrear extends ServicioIngresoServicioOtroCrear
{
    public crear(req:Request, res:Response):void{
        const objTemporal = new IngresoServicioOtro(0,0,0,new Date,new Date);
        objTemporal.codIngresoServicioOtro = req.body.codIngresoServicioOtro;
        objTemporal.codServicioOtro  = req.body.codServicioOtro;
        objTemporal.codPuesto = req.body.codPuesto;
        objTemporal.fechaIngresoServicioOtro = req.body.fechaIngresoServicioOtro;
        objTemporal.fechaSalidaServicioOtro = req.body.fechaSalidaServicioOtro;
        console.log(objTemporal);
        ServicioIngresoServicioOtroCrear.grabarIngresoServicioOtro(objTemporal,res);
    }
}
const controladorIngresoServicioOtroCrear = new ControladorIngresoServicioOtroCrear();
export default controladorIngresoServicioOtroCrear;