import { Request, Response } from "express";
import ServicioEliminarServicioDiarios from "../service/ServicioEliminarSevicioDiario";
import Ser_Diarios from "../model/Ser_Diarios";

class ControladorEliminarServicioDiario extends ServicioEliminarServicioDiarios{
    public llamarEliminar(req:Request, res:Response):void{
        const codigo=Number(req.params.CodServicioDiarios);
        const objt=new Ser_Diarios(codigo,req.body.CodParqueadero,req.body.CodVehiculo,req.body.CodPuesto,new Date(req.body.FechaInicio),new Date(req.body.FechaFin),req.body.ValorDiario)
        ServicioEliminarServicioDiarios.eliminar(objt,res);
    }

}

const controladorEliminarServicioDiarios= new ControladorEliminarServicioDiario();
export default controladorEliminarServicioDiarios;