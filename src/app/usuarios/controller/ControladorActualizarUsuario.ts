import { Response,Request } from "express";
import ServicicioActualizarUsuario from "../service/ServicioActualizarUsuario";
import Usuario from "../model/Usuario";

class ControladorActualizarUsuario extends ServicicioActualizarUsuario {
  public Actualizar(req: Request, res: Response): void {
<<<<<<< HEAD
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
=======
    try {
      // Validar campos requeridos
      const camposRequeridos = ['codUsuario', 'codRol', 'documentoUsuario', 'nombresUsuario', 
        'apellidosUsuario', 'generoUsuario', 'fechaNacimientoUsuario', 'telefonoUsuario'];
      
      const camposFaltantes = camposRequeridos.filter(campo => !req.body[campo]);
      
      if (camposFaltantes.length > 0) {
        res.status(400).json({
          respuesta: `Campos requeridos faltantes: ${camposFaltantes.join(', ')}`
        });
        return;
      }

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
    } catch (error: any) {
      res.status(400).json({
        respuesta: error.message || "Error en los datos proporcionados"
      });
    }
>>>>>>> 62f9d91 (Cambios realizados)
  }
}

const controladorActualizarUsuario = new ControladorActualizarUsuario();
export default controladorActualizarUsuario;
