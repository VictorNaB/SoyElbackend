import { Request, Response } from "express";
import Vehiculo from "../model/Vehiculo";
import ServicioVehiculoCrear from "../service/ServicioVehiculoCrear";

class ControladorVehiculoCrear {
  public llamarGrabarVehiculo(req: Request, res: Response): void {
    const objTemporal = new Vehiculo(
      0,
      req.body.codTipoVehiculo,
      req.body.codUsuario,
      req.body.placaVehiculo
    );
    ServicioVehiculoCrear.grabarVehiculo(objTemporal, res);
  }
}

const controladorVehiculoCrear = new ControladorVehiculoCrear();
export default controladorVehiculoCrear;