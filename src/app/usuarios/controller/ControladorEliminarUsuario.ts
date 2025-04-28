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
const controladorEliminarUsuario = new ControladorEliminarUsuario();
export default controladorEliminarUsuario;