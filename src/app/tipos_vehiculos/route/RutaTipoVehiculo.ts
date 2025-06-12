import { Router } from "express";
import controladorTipoVehiculoConsulta from "../controller/ControladorTipoVehiculoConsulta";
import validarDatos from "../../../middleware/ValidarDatos";
import controladorTipoVehiculoCrear from "../controller/ControladorTipoVehiculoCrear";
import {
  datosTipoVehiculoCrear,
  datosTipoVehiculoActualizar,
  datosTipoVehiculoBorrar,
} from "../../../config/domain/ValidarTipoVehiculo";
import controladorTipoVehiculoBorrar from "../controller/ControladorTipoVehiculoBorrar";
import controladorTipoVehiculoActualizar from "../controller/ControladorTipoVehiculoActualizar";

class RutaTipoVehiculo {
  public rutaTipoVehiculoApi: Router;

  constructor() {
    this.rutaTipoVehiculoApi = Router();

    this.rutaTipoVehiculoApi.get(
      "/getall",
      controladorTipoVehiculoConsulta.llamarObtenerTodos
    );

    this.rutaTipoVehiculoApi.post(
      "/add",
      datosTipoVehiculoCrear,
      validarDatos.ahora,
      controladorTipoVehiculoCrear.llamarGrabarTipoVehiculo
    );

    this.rutaTipoVehiculoApi.delete(
      "/delete/:codTipoVehiculo",
      datosTipoVehiculoBorrar,
      validarDatos.ahora,
      controladorTipoVehiculoBorrar.llamarBorrar
    );

    this.rutaTipoVehiculoApi.put(
      "/update",
      datosTipoVehiculoActualizar,
      validarDatos.ahora,
      controladorTipoVehiculoActualizar.llamarActualizar
    );
  }
}
const rutaTipoVehiculo = new RutaTipoVehiculo();
export default rutaTipoVehiculo.rutaTipoVehiculoApi;