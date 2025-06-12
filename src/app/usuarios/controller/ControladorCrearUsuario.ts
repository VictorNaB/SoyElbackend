import { Request, Response } from "express";
import Usuario from "../model/Usuario";
import ServicioCrearUsuario from "../service/ServicioCrearUsuario";


class ControladorCrearUsuario extends ServicioCrearUsuario {
  public Crearusuario(req: Request, res: Response): void {
<<<<<<< HEAD
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
=======
    try {
      // Validar campos requeridos
      const camposRequeridos = ['codRol', 'documentoUsuario', 'nombresUsuario', 
        'apellidosUsuario', 'generoUsuario', 'fechaNacimientoUsuario', 'telefonoUsuario'];
      
      const camposFaltantes = camposRequeridos.filter(campo => !req.body[campo]);
      
      if (camposFaltantes.length > 0) {
        res.status(400).json({
          respuesta: `Campos requeridos faltantes: ${camposFaltantes.join(', ')}`
        });
        return;
      }

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
    } catch (error: any) {
      res.status(400).json({
        respuesta: error.message || "Error en los datos proporcionados"
      });
    }
>>>>>>> 62f9d91 (Cambios realizados)
  }
}

const controladorCrearUsuario = new ControladorCrearUsuario();
export default controladorCrearUsuario;