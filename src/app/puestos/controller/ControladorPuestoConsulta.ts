import { Request, Response } from "express"
import ServicioPuestoConsulta from "../service/ServicioPuestoConsulta";


class ControladorPuestoConsulta extends ServicioPuestoConsulta{

    public llamarObtenerPuestos(req:Request, res:Response):void{
        ServicioPuestoConsulta.obtenerPuestos(res);

    }

}

const controladorPuestoconsulta= new ControladorPuestoConsulta();
export default controladorPuestoconsulta;