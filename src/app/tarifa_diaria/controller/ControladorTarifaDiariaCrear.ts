import { Request, Response } from "express";
import ServicioTarifaDiariaCrear from "../service/ServicioTarifaDiariaCrear";
import TarifaDiaria from "../model/TarifaDiaria";

class ControladorTarifaDiariaCrear extends ServicioTarifaDiariaCrear {
    public llamarGrabarTarifaDiaria(req: Request, res: Response): void {
        const objtemporal=new TarifaDiaria(0,0,0);
        objtemporal.codParqueadero = req.body.codParqueadero;
        objtemporal.codTipoVehiculo = req.body.codTipoVehiculo;
        objtemporal.valorTarifaDiaria = req.body.valorTarifaDiaria;
        ServicioTarifaDiariaCrear.CrearTarifaDiaria(objtemporal, res);
    }
}

const controladorTarifaDiariaCrear = new ControladorTarifaDiariaCrear();
export default controladorTarifaDiariaCrear;