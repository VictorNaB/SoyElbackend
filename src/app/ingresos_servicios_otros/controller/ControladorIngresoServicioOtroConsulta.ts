import { Request, Response } from "express";
import ServicioIngresoServicioOtroConsulta from "../service/ServicioIngresoServicioOtroConsulta";

class ControladoIngresoServicioOtroConsulta extends ServicioIngresoServicioOtroConsulta
{
    public obtenerTodo(req: Request,res:Response): void{
        ServicioIngresoServicioOtroConsulta.obtenerTodos(res);
    }
}
const controladorServicioConsulta = new ControladoIngresoServicioOtroConsulta();
export default controladorServicioConsulta;