import { Request,Response } from "express";
import ServicioPuestoCrear from "../service/ServicioPuestoCrear";
import Puesto from "../model/Puesto";

class ControladorPuestoCrear extends ServicioPuestoCrear{
    public llamarCrearPuesto(req:Request,res:Response):void{
        console.log("Datos recibidos:", req.body);
        const ObjCreo= new Puesto(0,0,0,"");
        ObjCreo.CodParqueadero=req.body.CodParqueadero;
        ObjCreo.CodTipoVehiculo=req.body.CodTipoVehiculo;
        ObjCreo.detallePuesto=req.body.detallePuesto;
        console.log(ObjCreo);
        ServicioPuestoCrear.CrearPuesto(ObjCreo,res); 

    }

}

const controladorPuestoCrear=new ControladorPuestoCrear();
export default controladorPuestoCrear;