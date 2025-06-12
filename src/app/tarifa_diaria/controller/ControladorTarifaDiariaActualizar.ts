import { Request, Response } from "express";
import ServicioTarifaDiariaActualizar from "../service/ServicioTarifaDiariaActualizar";
import TarifaDiaria from "../model/TarifaDiaria";

class ControladorTarifaDiariaActualizar extends ServicioTarifaDiariaActualizar {
    public llamarActualizarTarifaDiaria(req: Request, res: Response): void {
        const objtemporal=new TarifaDiaria(0,0,0);
        objtemporal.codParqueadero = req.body.codParqueadero;
        objtemporal.codTipoVehiculo = req.body.codTipoVehiculo;
        objtemporal.valorTarifaDiaria = req.body.valorTarifaDiaria;
        ServicioTarifaDiariaActualizar.ActualizarTarifaDiaria(objtemporal, res);
    }
}

const controladorTarifaDiariaActualizar = new ControladorTarifaDiariaActualizar();
export default controladorTarifaDiariaActualizar;