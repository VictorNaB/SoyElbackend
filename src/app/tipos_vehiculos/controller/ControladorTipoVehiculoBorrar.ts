import { Request, Response } from "express";
import ServicioTipoVehiculoBorrar from "../service/ServicioTipoVehiculoBorrar";
import TipoVehiculo from "../model/TipoVehiculo";

class ControladorTipoVehiculoBorrar extends ServicioTipoVehiculoBorrar {
  public llamarBorrar(req: Request, res: Response) {
    const codigo = Number(req.params.codTipoVehiculo);
    const objTipoVehiculo = new TipoVehiculo(codigo, "");
    ServicioTipoVehiculoBorrar.borrar(objTipoVehiculo, res);
  }
}

const controladorTipoVehiculoBorrar = new ControladorTipoVehiculoBorrar();
export default controladorTipoVehiculoBorrar;