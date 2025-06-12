import { Request, Response } from "express";
import ServicioObtenerTurno from "../service/ServicioObtenerTurno";

class ControladorObtenerTurnos extends ServicioObtenerTurno{
    public obtenerTurnos(req:Request, res:Response): void {
        ServicioObtenerTurno.ObtenerTurno(res);
    }
}

const controladorObtenerTurnos = new ControladorObtenerTurnos();
export default controladorObtenerTurnos;