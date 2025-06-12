import { Request, Response } from "express";
import Vehiculo from "../model/Vehiculo";
import ServicioVehiculoActualizar from "../service/ServicioVehiculoActualizar";

class ControladorVehiculoActualizar {
  public llamarActualizar(req: Request, res: Response): void {
    const objetito = new Vehiculo(
      req.body.codVehiculo,
      req.body.codTipoVehiculo,
      req.body.codUsuario,
      req.body.placaVehiculo
    );
    ServicioVehiculoActualizar.actualizarVehiculo(objetito, res);
  }
}
const controladorVehiculoActualizar = new ControladorVehiculoActualizar();
export default controladorVehiculoActualizar;