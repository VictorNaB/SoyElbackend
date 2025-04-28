import { Request, Response } from "express";
import Usuario from "../model/Usuario";
import ServicioCrearUsuario from "../service/ServicioCrearUsuario";


class ControladorCrearUsuario extends ServicioCrearUsuario {
  public Crearusuario(req: Request, res: Response): void {
    const objTemporal = new Usuario(
      0,
      req.body.codRol,
      req.body.documentoUsuario,
      req.body.nombresUsuario,
      req.body.apellidosUsuario,
      req.body.generoUsuario,
      new Date(req.body.fechaNacimientoUsuario),
      req.body.telefonoUsuario
    );
         ServicioCrearUsuario.CrearUsuario(objTemporal, res);
  }
}

const controladorCrearUsuario = new ControladorCrearUsuario();
export default controladorCrearUsuario;