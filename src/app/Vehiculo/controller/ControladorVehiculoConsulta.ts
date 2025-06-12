import { Request, Response } from "express";
import ServicioVehiculoConsulta from "../service/ServicioVehiculoConsulta";

class ControladorVehiculoConsulta {
  public llamarObtenerTodos(req: Request, res: Response): void {
    ServicioVehiculoConsulta.obtenerTodos(res);
  }
}
const controladorVehiculoConsulta = new ControladorVehiculoConsulta();
export default controladorVehiculoConsulta;