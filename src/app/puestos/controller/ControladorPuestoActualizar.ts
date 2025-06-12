import { Request, Response } from "express";
import ServicioPuestoActulizar from "../service/ServicioPuestoActualizar";
import Puesto from "../model/Puesto";


class ControladorPuestoActualizar extends ServicioPuestoActulizar{
    public llamarActualizar(req:Request,res:Response):void{
        console.log('Datos recibidos:', req.body);
        const Objtemporal=new Puesto(0,0,0,"");
        Objtemporal.codPuesto=req.body.codPuesto;
        Objtemporal.CodParqueadero=req.body.CodParqueadero;
        Objtemporal.CodTipoVehiculo=req.body.CodTipoVehiculo;
        Objtemporal.detallePuesto=req.body.detallePuesto;
        
        
        ServicioPuestoActulizar.Actualizar(Objtemporal,res);
    }
}
const controladorPuestoActualizar=new ControladorPuestoActualizar();
export default controladorPuestoActualizar;