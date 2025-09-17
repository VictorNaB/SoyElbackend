import { Request, Response } from "express";
import ServicioBorrarUsuario from "../service/ServicioBorrarUsuario";
import Usuario from "../model/Usuario";


class ControladorEliminarUsuario extends ServicioBorrarUsuario{
    public async BorrarUsuario(req:Request, res: Response): Promise<any> {
        const codUsuario = Number(req.params.codUsuario);
        const objt = new Usuario(codUsuario, req.body.codRol, req.body.documentoUsuario, req.body.nombresUsuario, req.body.apellidosUsuario, req.body.generoUsuario, new Date(req.body.fechaNacimientoUsuario), req.body.telefonoUsuario);
        await ServicioBorrarUsuario.eliminar(objt, res);
    }
}

class ControladorEliminarUsuario extends ServicioBorrarUsuario {
    public async BorrarUsuario(req: Request, res: Response): Promise<any> {
        try {
            const codUsuario = Number(req.params.codUsuario);
            
            if (isNaN(codUsuario) || codUsuario <= 0) {
                return res.status(400).json({
                    respuesta: "El código de usuario debe ser un número válido mayor a 0"
                });
            }

            // Validar que todos los campos necesarios estén presentes
            const camposRequeridos = ['codRol', 'documentoUsuario', 'nombresUsuario', 
                'apellidosUsuario', 'generoUsuario', 'fechaNacimientoUsuario', 'telefonoUsuario'];
            
            const camposFaltantes = camposRequeridos.filter(campo => !req.body[campo]);
            
            if (camposFaltantes.length > 0) {
                return res.status(400).json({
                    respuesta: `Campos requeridos faltantes: ${camposFaltantes.join(', ')}`
                });
            }

            const objt = new Usuario(
                codUsuario,
                req.body.codRol,
                req.body.documentoUsuario,
                req.body.nombresUsuario,
                req.body.apellidosUsuario,
                req.body.generoUsuario,
                new Date(req.body.fechaNacimientoUsuario),
                req.body.telefonoUsuario
            );
            
            await ServicioBorrarUsuario.eliminar(objt, res);
        } catch (error: any) {
            res.status(400).json({
                respuesta: error.message || "Error en los datos proporcionados"
            });
        }
    }
}


const controladorEliminarUsuario = new ControladorEliminarUsuario();

export default controladorEliminarUsuario;
