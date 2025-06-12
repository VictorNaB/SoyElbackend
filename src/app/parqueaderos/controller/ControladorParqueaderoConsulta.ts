import { Request, Response } from "express";

import ServicioParqueaderoConsulta from "../service/ServicioParqueaderoConsulta";

class ControladorParqueaderoConsulta extends ServicioParqueaderoConsulta {
    public obtenerTodos(req: Request, res: Response): void {
        ServicioParqueaderoConsulta.obtenerTodos(res);
    }
}

const instanciaControladorParqueaderoConsulta = new ControladorParqueaderoConsulta();
export default instanciaControladorParqueaderoConsulta;