import { Request, Response } from "express";
import ServicioIngresoConsultar from "../service/ServicioIngresoConsulta";

class ControladorIngresoConsulatar extends ServicioIngresoConsultar {
  public obtenerTodo(req: Request,res: Response): void {
    ServicioIngresoConsultar.obtenerTodos(res);
  }
}
const controladorIngresoConsultar = new ControladorIngresoConsulatar();
export default controladorIngresoConsultar;
