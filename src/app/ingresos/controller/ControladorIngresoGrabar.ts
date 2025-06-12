import { Request, Response } from "express";
import Ingreso from "../model/Ingreso";
import ServicioIngresoCrear from "../service/ServicioIngresosCrear";
import Accesos from "../../accesos/model/Accesos";

class ControladorIngresoGrabar extends ServicioIngresoCrear {
    public grabarIngreso( req: Request,res: Response ): void {
      
        
        
        const objTemporal = new Ingreso(0, 0, "", "");
        objTemporal.codUsuario = req.body.codUsuario;
        objTemporal.fechaIngreso = req.body.fechaIngreso;
        objTemporal.horaIngreso = req.body.horaIngreso;
        console.log(objTemporal);


    
        ServicioIngresoCrear.grabarIngresoServicioOtro(objTemporal, res);
    }

}
const controladorIngresoGrabar = new ControladorIngresoGrabar();
export default controladorIngresoGrabar;