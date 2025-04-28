import { Response,Request } from "express";
import ServicicioActualizarUsuario from "../service/ServicioActualizarUsuario";
import Usuario from "../model/Usuario";

class ControladorActualizarUsuario extends ServicicioActualizarUsuario {
  public Actualizar(req: Request, res: Response): void {
    const objTemporal = new Usuario(
      req.body.codUsuario,
      req.body.codRol,
      req.body.documentoUsuario,
      req.body.nombresUsuario,
      req.body.apellidosUsuario,
      req.body.generoUsuario,
      new Date(req.body.fechaNacimientoUsuario),
      req.body.telefonoUsuario
    );
    ServicicioActualizarUsuario.ActualizarUsuario(objTemporal, res);
  }
}

const controladorActualizarUsuario = new ControladorActualizarUsuario();
export default controladorActualizarUsuario;
