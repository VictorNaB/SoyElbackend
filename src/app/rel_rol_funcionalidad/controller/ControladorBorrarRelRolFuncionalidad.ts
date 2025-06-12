import { Request, Response } from "express";
import ServicioBorrarRelRolFuncionalidad from "../service/ServicioBorrarRelRolFuncionalidad";
import Rel_rol_funcionalidad from "../model/Rel_rol_funcionalidad";

class ControladorBorrarRelRolFuncionalidad {
  public async borrar(req: Request, res: Response): Promise<void> {
    try {
      const { codRol, codFuncionalidad } = req.params;
      const relRolFuncionalidad = new Rel_rol_funcionalidad(
        parseInt(codRol),
        parseInt(codFuncionalidad)
      );
      
      await ServicioBorrarRelRolFuncionalidad.borrar(relRolFuncionalidad, res);
    } catch (error) {
      console.error("Error en el controlador al eliminar la relación:", error);
      res.status(500).json({ mensaje: "Error al eliminar la relación" });
    }
  }
}

const controladorBorrarRelRolFuncionalidad = new ControladorBorrarRelRolFuncionalidad();
export default controladorBorrarRelRolFuncionalidad; 