<<<<<<< HEAD
import Rol from "../model/Rol";
import { Request, Response } from "express";
import ServicioRolBorrar from "../service/ServicioRolBorrar";

class ControladorRolBorrar extends ServicioRolBorrar{
    public llamarRolBorrar(req:Request, res:Response):void{
        const codigo= Number(req.params.codRol);
        const ObjRol= new Rol(codigo, "");
        ServicioRolBorrar.borrar(ObjRol,res)
    }

}

const controladorRolBorrar=new ControladorRolBorrar();
export default controladorRolBorrar;
=======
import { Request, Response } from "express";
import ServicioRolBorrar from "../service/ServicioRolBorrar";
import Rol from "../model/Rol";

class ControladorRolBorrar {
  public async borrar(req: Request, res: Response): Promise<void> {
    const servicioRolBorrar = new ServicioRolBorrar();
    await servicioRolBorrar.borrar(req, res);
  }
}

export default ControladorRolBorrar;
>>>>>>> 62f9d91 (Cambios realizados)
