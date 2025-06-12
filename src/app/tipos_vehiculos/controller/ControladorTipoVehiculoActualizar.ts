import { Request, Response } from "express";
import ServicioTipoVehiculoActualizar from "../service/ServicioTipoVehiculoActualizar";
import TipoVehiculo from "../model/TipoVehiculo";

class ControladorTipoVehiculoActualizar extends ServicioTipoVehiculoActualizar {
  public llamarActualizar(req: Request, res: Response): void {
    const objeto = new TipoVehiculo(0, "");
    objeto.codTipoVehiculo = Number(req.body.codTipoVehiculo);
    objeto.claseTipoVehiculo = req.body.claseTipoVehiculo;
    ServicioTipoVehiculoActualizar.actualizarTipoVehiculo(objeto, res);
  }
}

const controladorTipoVehiculoActualizar = new ControladorTipoVehiculoActualizar();
export default controladorTipoVehiculoActualizar;