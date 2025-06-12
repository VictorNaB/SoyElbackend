import { Request, Response } from "express";
import ServicioTarifaDiariaConsulta from "../service/ServicioTarifaDiariaConsulta";

class ControladorTarifaDiariaConsulta extends ServicioTarifaDiariaConsulta {
    public llamaroObtenerTodos(req: Request, res: Response): void {
        ServicioTarifaDiariaConsulta.obtenerTodos(res);
    }

}

const controladorTarifaDiariaConsulta = new ControladorTarifaDiariaConsulta();
export default controladorTarifaDiariaConsulta;