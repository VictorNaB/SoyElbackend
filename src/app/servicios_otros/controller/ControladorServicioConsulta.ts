import { Request, Response } from "express";
import ServicioConsulta from "../service/ServicioServicioOtro";
class ControladorServicioConsulta extends ServicioConsulta {
    public obtenerTodos(req: Request,res: Response): void {
        ServicioConsulta.obtenerTodos(res);
    }
}
const controladorServicioConsulta = new ControladorServicioConsulta();
export default controladorServicioConsulta;