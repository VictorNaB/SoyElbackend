import { Request, Response } from "express";

import ServicioParqueaderoCrear from "../service/ServicioParqueaderoCrear";
import Parqueadero from "../model/Parqueadero";

class ControladorParqueaderoCrear extends ServicioParqueaderoCrear {
    public crearParqueadero(req: Request, res: Response): void {
        const objTemp = new Parqueadero(
            0,
            req.body.ubicacion,
            req.body.nombreParqueadero,
            req.body.direccionParqueadero,
            req.body.telefonoParqueadero
        );
        
        ServicioParqueaderoCrear.crearParqueadero(objTemp, res);
    }
}

const controladorParqueaderoCrear = new ControladorParqueaderoCrear();
export default controladorParqueaderoCrear;