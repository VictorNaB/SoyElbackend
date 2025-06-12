import { Request, Response } from "express";

import ServicioUbicacionBorrar from "../service/ServicioUbicacionBorrar";
import Ubicacion from "../model/Ubicacion";

class ControladorUbicacionBorrar extends ServicioUbicacionBorrar {
    public llamarBorrarUbicacion(req: Request, res: Response): void {
        const codUbicacion = Number(req.params.codUbicacion);
        ServicioUbicacionBorrar.borrarUbicacion({ codUbicacion: codUbicacion }, res);
    }
}

const controladorUbicacionBorrar = new ControladorUbicacionBorrar();
export default controladorUbicacionBorrar; //exporta una instancia