import { Request, Response } from "express";

import ServicioParqueaderoBorrar from "../service/ServicioParqueaderoBorrar";
import Parqueadero from "../model/Parqueadero";


class ControladorParqueaderoBorrar extends ServicioParqueaderoBorrar {
    public borrarParqueadero(req: Request, res: Response): void {
        const codigo = Number(req.params.codParqueadero);
        const objParqueadero = new Parqueadero(codigo, req.body.ubicacion, req.body.nombreParqueadero, req.body.direccionParqueadero, req.body.telefonoParqueadero);

        ServicioParqueaderoBorrar.borrarParqueadero(objParqueadero, res);
    }
}

const controladorParqueaderoBorrar = new ControladorParqueaderoBorrar();
export default controladorParqueaderoBorrar;