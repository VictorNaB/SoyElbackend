import { Request, Response } from "express";
import ServicioIngresoActualizar from "../service/ServicioIngresoActualizar";
import Ingreso from "../model/Ingreso";

class ControladorIngresoActulizar extends ServicioIngresoActualizar
{
    public actualizar(req: Request,res:Response):void
    {
        const objTemoral = new Ingreso(0,0,"","");
        objTemoral.codIngreso = req.body.codIngreso;
        objTemoral.codUsuario = req.body.codUsuario;
        objTemoral.fechaIngreso= req.body.fechaIngreso;
        objTemoral.horaIngreso= req.body.horaIngreso;
        ServicioIngresoActualizar.actualizarIngreso(objTemoral,res);
    }
}
const controladorIngresoActualizar = new ControladorIngresoActulizar();
export default controladorIngresoActualizar;