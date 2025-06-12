import { Request, Response } from "express";
import ServicioCrearAccesos from "../service/ServicioCrearAcessos";
import Accesos from "../model/Accesos";

class ControladorCrearAcceso extends ServicioCrearAccesos {
  public CrearAcceso(req: Request, res: Response): void {
    const objTemporal = new Accesos(
      req.body.codUsuario,
      req.body.correo,
      req.body.clave,
      req.body.uuid
    );
    ServicioCrearAccesos.crearAcceso(objTemporal, res);
  }
}
const controladorCrearAcceso = new ControladorCrearAcceso();
export default controladorCrearAcceso;
