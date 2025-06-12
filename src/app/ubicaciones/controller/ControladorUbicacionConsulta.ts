import { Request, Response } from "express";
import ServicioUbicacionConsulta from "../service/ServicioUbicacionConsulta";

class ControladorUbicacionConsulta extends ServicioUbicacionConsulta {

    public obtenerTodos(req: Request, res: Response): void {
        ServicioUbicacionConsulta.obtenerTodos(res);
    }
}

const controladorUbicacionConsulta = new ControladorUbicacionConsulta();
export default controladorUbicacionConsulta; //exporta una instancia