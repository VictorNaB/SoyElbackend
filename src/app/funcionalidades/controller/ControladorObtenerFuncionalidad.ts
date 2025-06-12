import { Request, Response } from "express";
import ServicioObtenerFuncionalidad from "../service/ServicioObtenerFuncionalidad";

class ControllerFunctionalityGet extends ServicioObtenerFuncionalidad{
    public getAll(req:Request,res:Response){
        ServicioObtenerFuncionalidad.Obtener(res);
    }
}
const controllerFunctionalityGet = new ControllerFunctionalityGet();
export default controllerFunctionalityGet;