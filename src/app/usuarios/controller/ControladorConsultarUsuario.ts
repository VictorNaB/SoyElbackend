import ServicioConsultarUsuario from "../service/ServicioConsultarUsuario";
import { Response, Request } from "express";


class ControladorConsultarUsuario extends ServicioConsultarUsuario{
    public LlamarConsulta(req:Request,res: Response): void {
        ServicioConsultarUsuario.consultarUsuario(res);
    }
}

const controladorConsultarUsuario = new ControladorConsultarUsuario();
export default controladorConsultarUsuario;