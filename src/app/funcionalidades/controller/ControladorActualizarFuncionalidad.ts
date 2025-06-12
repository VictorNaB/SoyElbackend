import { Request, Response } from "express";
import Funcionalidad from "../model/Funcionalidad";
import ServiceFunctionalityUpdate from "../service/ServicioActualizarFuncionalidad";

class ControllerFunctionalityUpdate extends ServiceFunctionalityUpdate {
  public update(req: Request, res: Response) {
    const obj = new Funcionalidad(
      req.body.codFuncionalidad,
      req.body.codPadreFuncionalidad,
      req.body.nombreFuncionalidad,
      req.body.urlFuncionalidad
    );
    ServiceFunctionalityUpdate.Actualizar(obj, res);
  }
}
const controllerFunctionalityUpdate = new ControllerFunctionalityUpdate();
export default controllerFunctionalityUpdate;