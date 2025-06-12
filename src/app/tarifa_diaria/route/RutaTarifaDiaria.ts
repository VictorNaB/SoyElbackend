import { Router } from "express";
import controladorTarifaDiariaConsulta from "../controller/ControladorTarifaDiariaConsulta";
import controladorTarifaDiariaCrear from "../controller/ControladorTarifaDiariaCrear";
import controladorTarifaDiariaBorrar from "../controller/ControladorTarifaDiariaBorrar";
import controladorTarifaDiariaActualizar from "../controller/ControladorTarifaDiariaActualizar";
import {
    datosTarifaDiariaCrear,
    datosTarifaDiariaActualizar,
    datosTarifaDiariaVerParamTipoVehiculo,
    datosTarifaDiariaVerParamParqueadero
} from "../../../config/domain/ValidarTarifaDiaria";
import validarDatos from "../../../middleware/ValidarDatos";

class RutaTarifaDiaria {
    public rutaTarifaDiariaApi: Router;

    constructor() {
        this.rutaTarifaDiariaApi = Router();
        this.configurarRutasConsulta();
    }

    private configurarRutasConsulta(): void {
        // Obtener todas las tarifas
        this.rutaTarifaDiariaApi.get(
            "/getall",
            controladorTarifaDiariaConsulta.llamaroObtenerTodos
        );

        this.rutaTarifaDiariaApi.post(
            "/add",
            datosTarifaDiariaCrear,
            validarDatos.ahora,
            controladorTarifaDiariaCrear.llamarGrabarTarifaDiaria
        );
       

        this.rutaTarifaDiariaApi.delete(
            "/delete/:codParqueadero/:codTipoVehiculo",
            datosTarifaDiariaVerParamParqueadero,
            datosTarifaDiariaVerParamTipoVehiculo,
            validarDatos.ahora,
            controladorTarifaDiariaBorrar.llamarBorrarTarifaDiaria
        );

        this.rutaTarifaDiariaApi.put(
            "/update",
            datosTarifaDiariaActualizar,
            validarDatos.ahora,
            controladorTarifaDiariaActualizar.llamarActualizarTarifaDiaria
        );
      

    
        
    }
}

const rutaTarifaDiaria = new RutaTarifaDiaria();
export default rutaTarifaDiaria.rutaTarifaDiariaApi;