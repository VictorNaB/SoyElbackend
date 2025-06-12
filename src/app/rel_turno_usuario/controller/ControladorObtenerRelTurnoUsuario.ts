import ServicioObtenerRelTurnoUsuario from "../service/ServicioObtenerRelTurnoUsuario"
import { Request, Response } from "express";

class ControladorObtenerTurnoUsuario extends ServicioObtenerRelTurnoUsuario{
    public llamarConsulta(req:Request,res:Response):void{
        ServicioObtenerRelTurnoUsuario.ObtenerRelTurnoUsuario(res);
    }
}

const controladorObtenerRelTurnoUsuario= new ControladorObtenerTurnoUsuario();
export default controladorObtenerRelTurnoUsuario;