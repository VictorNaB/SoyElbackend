import { Request, Response } from "express";
import ServicioCrearFuncionalidad from "../service/ServicioCrearFuncionalidad";
import Funcionalidad from "../model/Funcionalidad";

class ControllerFunctionalityCreate extends ServicioCrearFuncionalidad{
    public create(req:Request, res:Response){
        const obj:Funcionalidad = new Funcionalidad(
            0,
            req.body.codPadreFuncionalidad,
            req.body.nombreFuncionalidad,
            req.body.urlFuncionalidad
        ); 
        ServicioCrearFuncionalidad.Crear(obj,res);
    }
}
const controllerFunctionalityCreate = new ControllerFunctionalityCreate();
export default controllerFunctionalityCreate;