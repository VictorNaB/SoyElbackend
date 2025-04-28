import { Request,Response } from "express";
import ServicioCrearServicioDiarios from "../service/ServicioCrearServicioDiario";
import Ser_Diarios from "../model/Ser_Diarios";

class ControladoServicioDiarioCrear extends ServicioCrearServicioDiarios{
    public CrearServicio(req:Request, res:Response):void{
        const objTemporal=new Ser_Diarios(0,0,0,0,new Date(),new Date(),0)
        objTemporal.CodServicioDiarios = req.body.CodServicioDiarios;
        objTemporal.CodParqueadero = req.body.CodParqueadero;
        objTemporal.CodVehiculo = req.body.CodVehiculo;
        objTemporal.CodPuesto = req.body.CodPuesto;
        objTemporal.FechaInicio = new Date(req.body.FechaInicio);
        objTemporal.FechaFin = new Date(req.body.FechaFin);
        objTemporal.ValorDiario = req.body.ValorDiario;
        ServicioCrearServicioDiarios.CrearServicio_Diario(objTemporal,res);
    }

}

const controladorServicioDiarioCrear= new ControladoServicioDiarioCrear();
export default controladorServicioDiarioCrear;