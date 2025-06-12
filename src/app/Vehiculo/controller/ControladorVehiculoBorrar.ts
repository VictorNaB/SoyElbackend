import { Request, Response } from "express";
import ServicioVehiculoBorrar from "../service/ServicioVehiculoBorrar";
import Vehiculo from "../model/Vehiculo";

class ControladorVehiculoBorrar {
  public llamarBorrar(req: Request, res: Response): void {
    const codigo = Number(req.params.codVehiculo);
    const objVehiculo = new Vehiculo(codigo, 0, 0, "");
    ServicioVehiculoBorrar.borrar(objVehiculo, res);
  }
}

const controladorVehiculoBorrar = new ControladorVehiculoBorrar();
export default controladorVehiculoBorrar;