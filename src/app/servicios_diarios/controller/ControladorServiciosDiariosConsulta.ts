import { Request, Response } from "express";
import Servicios_DiariosConsulta from "../service/Servicio_DiariosConsulta";


class ControladorServiciosDiariosConsulta extends Servicios_DiariosConsulta{
    public llamarConsulta(req:Request,res:Response):void{
        Servicios_DiariosConsulta.ConsultaDiarios(res);
    }


}

const controladorServiciosDiariosConsulta= new ControladorServiciosDiariosConsulta();
export default controladorServiciosDiariosConsulta;