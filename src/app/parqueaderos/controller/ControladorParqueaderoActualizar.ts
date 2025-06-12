import { Request, Response } from "express";
import ServicioParqueaderoActualizar from "../service/ServicioParqueaderoActualizar";
import Parqueadero from "../model/Parqueadero";

class ControladorParqueaderoActualizar extends ServicioParqueaderoActualizar {
    public actualizarParqueadero(req: Request, res: Response) {
        const objTemp = new Parqueadero(
            req.body.codParqueadero,
            req.body.ubicacion,
            req.body.nombreParqueadero,
            req.body.direccionParqueadero,
            req.body.telefonoParqueadero
        );

        ServicioParqueaderoActualizar.actualizarParqueadero(objTemp, res);
    }
}

const controladorParqueaderoActualizar = new ControladorParqueaderoActualizar();
export default controladorParqueaderoActualizar;