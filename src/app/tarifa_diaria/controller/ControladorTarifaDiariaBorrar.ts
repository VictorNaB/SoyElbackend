import { Request, Response } from "express";
import ServicioTarifaDiariaBorrar from "../service/ServicioTarifaDiariaBorrar";
import TarifaDiaria from "../model/TarifaDiaria";

class ControladorTarifaDiariaBorrar extends ServicioTarifaDiariaBorrar {
    public llamarBorrarTarifaDiaria(req: Request, res: Response): void {
        const codigo=Number(req.params.codParqueadero);
        const codTipoVehiculo =Number (req.params.codTipoVehiculo);
        const objTarifa= new TarifaDiaria(codigo, codTipoVehiculo, 0); // El valor no es relevante para la eliminación
        ServicioTarifaDiariaBorrar.borrarTarifaDiaria(objTarifa, res);
    }
}

const controladorTarifaDiariaBorrar = new ControladorTarifaDiariaBorrar();
export default controladorTarifaDiariaBorrar;