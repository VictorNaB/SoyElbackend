import { Request, Response } from "express";
import ServicioActualizarRelRolFuncionalidad from "../service/ServicioActualizarRelRolFuncionalidad";
import Rel_rol_funcionalidad from "../model/Rel_rol_funcionalidad";

class ControladorActualizarRelRolFuncionalidad extends ServicioActualizarRelRolFuncionalidad {
    public actualizar(req: Request, res: Response): void {
        const oldRel = new Rel_rol_funcionalidad(
            req.body.oldCodRol,
            req.body.oldCodFuncionalidad
        );
        
        const newRel = new Rel_rol_funcionalidad(
            req.body.newCodRol,
            req.body.newCodFuncionalidad
        );

        ServicioActualizarRelRolFuncionalidad.actualizar(oldRel, newRel, res);
    }
}

const controladorActualizarRelRolFuncionalidad = new ControladorActualizarRelRolFuncionalidad();
export default controladorActualizarRelRolFuncionalidad; 