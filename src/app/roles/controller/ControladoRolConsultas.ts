import { Request,Response } from "express";
import ServicioRolConsulta from "../service/ServicioRolConsulta";

class ControladorRolConsulta extends ServicioRolConsulta{
    public llamarObtenerTodos(req:Request, res:Response): void{
        ServicioRolConsulta.obtenerTodos(res);
        
    }



}

const controladorRolConsulta=new ControladorRolConsulta();
//Aqui se exporta un objeto
export default controladorRolConsulta;
