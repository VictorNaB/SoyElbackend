import { Request, Response } from "express";
import ServicioConsultarAccesos from "../service/ServicioConsultarAccesos";

class ControladorConsultaAcceso  extends ServicioConsultarAccesos {
    public Consulta(req:Request, res:Response):void{
        ServicioConsultarAccesos.ConsultaAccesos(res);
    }
}
const controladorConsultaAcceso=new ControladorConsultaAcceso();
export default controladorConsultaAcceso;