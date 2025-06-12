import { Request, Response } from "express";
import ServicioBorrarFuncionalidad from "../service/ServicioBorrarFuncionalidad";
import Funcionalidad from "../model/Funcionalidad";

class ControladorBorrarFuncionalidad extends ServicioBorrarFuncionalidad {
    public static async borrar(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const funcionalidad = new Funcionalidad(id, 0, "", "");
        await ServicioBorrarFuncionalidad.Borrar(funcionalidad, res);
    }
}

export default ControladorBorrarFuncionalidad;