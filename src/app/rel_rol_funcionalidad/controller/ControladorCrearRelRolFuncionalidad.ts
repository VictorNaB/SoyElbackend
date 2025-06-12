import { Request, Response } from "express";
import Rel_rol_funcionalidad from "../model/Rel_rol_funcionalidad";
import ServicioCrearRelRolFuncionalidad from "../service/ServicioCrearRelRolFuncionalidad";

class ControladorCrearRelRolFuncionalidad extends ServicioCrearRelRolFuncionalidad{
    public crear(req:Request,res:Response){
        const obj:Rel_rol_funcionalidad = new Rel_rol_funcionalidad(
            req.body.codRol,
            req.body.codFuncionalidad
        );
        ServicioCrearRelRolFuncionalidad.Crear(obj,res);
    }
}

const controladorCrearRelRolFuncionalidad = new ControladorCrearRelRolFuncionalidad();
export default controladorCrearRelRolFuncionalidad;