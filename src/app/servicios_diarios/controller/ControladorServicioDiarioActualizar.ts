import { Request,Response } from "express";
import ServicioActualizarServiciosDiarios from "../service/ServicioActualizarServiciosDiarios";
import Ser_Diarios from "../model/Ser_Diarios";

class ControladorServicioDiarioActualizar extends ServicioActualizarServiciosDiarios{
    public llamarActualizar(req:Request,res:Response):void{
        const Objtemporal=new Ser_Diarios(0,0,0,0,new Date(),new Date(),0);
        Objtemporal.CodServicioDiarios = req.body.CodServicioDiarios;
        Objtemporal.CodParqueadero = req.body.CodParqueadero;
        Objtemporal.CodVehiculo = req.body.CodVehiculo;
        Objtemporal.CodPuesto = req.body.CodPuesto;
        Objtemporal.FechaInicio = new Date(req.body.FechaInicio);
        Objtemporal.FechaFin = new Date(req.body.FechaFin);
        Objtemporal.ValorDiario = req.body.ValorDiario;
        ServicioActualizarServiciosDiarios.Actualizar(Objtemporal,res);


    }

}

const controladorServicioDiarioActualizar= new ControladorServicioDiarioActualizar();
export default controladorServicioDiarioActualizar;