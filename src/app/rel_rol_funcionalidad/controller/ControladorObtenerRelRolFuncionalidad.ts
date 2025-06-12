import { Request, Response } from "express";
import ServicioObtenerRelRolFuncinalidad from "../service/ServicioObtenerRelRolFuncionalida";
import ServicioObtenerRelRolFuncionalidadConsultar from "../service/ServicioObtenerRelRolFuncionalida";

class ControladorObtenerRelRolFuncionalidad extends ServicioObtenerRelRolFuncionalidadConsultar{
    public Obtener(req:Request,res:Response){
        ServicioObtenerRelRolFuncinalidad.Obtener(res);
    }
}
const controladorObtenerRelRolFuncionalidad = new ControladorObtenerRelRolFuncionalidad();
export default controladorObtenerRelRolFuncionalidad;