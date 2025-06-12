import { Request, Response } from "express";
import ServicioTipoVehiculoCrear from "../service/ServicioTipoVehiculoCrear";
import TipoVehiculo from "../model/TipoVehiculo";

class ControladorTipoVehiculoCrear extends ServicioTipoVehiculoCrear {
  public llamarGrabarTipoVehiculo(req: Request, res: Response): void {
    const objTemporal = new TipoVehiculo(0, req.body.claseTipoVehiculo);
    ServicioTipoVehiculoCrear.grabarTipoVehiculo(objTemporal, res);
  }
}

const controladorTipoVehiculoCrear = new ControladorTipoVehiculoCrear();
export default controladorTipoVehiculoCrear;