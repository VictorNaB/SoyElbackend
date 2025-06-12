import { Request, Response } from "express";
import ServicioUbicacionActualizar from "../service/ServicioUbicacionActualizar";
import Ubicacion from "../model/Ubicacion";

class ControladorUbicacionActualizar extends ServicioUbicacionActualizar {
    public llamarActualizarUbicacion(req: Request, res: Response): void {
        const objTemp = new Ubicacion(
            req.body.codUbicacion,
            req.body.codPadreUbicacion,
            req.body.codExternoUbicacion,
            req.body.nombreUbicacion
        );

        ServicioUbicacionActualizar.actualizarUbicacion(objTemp, res);
    }
}

const controladorUbicacionActualizar = new ControladorUbicacionActualizar();
export default controladorUbicacionActualizar; //exporta una instancia