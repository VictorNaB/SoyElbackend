import { Request, Response } from "express";
import ServicioUbicacionCrear from "../service/ServicioUbicacionCrear";
import Ubicacion from "../model/Ubicacion";

class ControladorUbicacionCrear extends ServicioUbicacionCrear {
    public llamarCrearUbicacion(req: Request, res: Response): void {
        const objTemp = new Ubicacion(0, 0, "", "");
        
        objTemp.codPadreUbicacion = req.body.codPadreUbicacion;
        objTemp.codExternoUbicacion = req.body.codExternoUbicacion;
        objTemp.nombreUbicacion = req.body.nombreUbicacion;

        ServicioUbicacionCrear.crearUbicacion(objTemp, res);
    }
}

const controladorUbicacionCrear = new ControladorUbicacionCrear();
export default controladorUbicacionCrear; 