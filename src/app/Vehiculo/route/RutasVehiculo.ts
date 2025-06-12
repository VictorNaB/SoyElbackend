import { Router } from "express";
import controladorVehiculoCrear from "../controller/ControladorVehiculoCrear";
import controladorVehiculoActualizar from "../controller/ControladorVehiculoActualizar";
import controladorVehiculoBorrar from "../controller/ControladorVehiculoBorrar";
import controladorVehiculoConsulta from "../controller/ControladorVehiculoConsulta";
import {
  datosVehiculoActualizar,
  datosVehiculoBorrar,
  datosVehiculoCrear,
} from "../../../config/domain/ValidarVehiculo";
import validarDatos from "../../../middleware/ValidarDatos";

class RutasVehiculo {
  public rutasVehiculoAPI: Router;

  constructor() {
    this.rutasVehiculoAPI = Router();
    this.configurarRutas();
  }

  public configurarRutas(): void {
    // Ruta para obtener todos los vehículos
    this.rutasVehiculoAPI.get(
      "/getall",
      controladorVehiculoConsulta.llamarObtenerTodos
    );

    // Ruta para crear un vehículo
    this.rutasVehiculoAPI.post(
      "/add",
      datosVehiculoCrear,
      validarDatos.ahora,
      controladorVehiculoCrear.llamarGrabarVehiculo
    );

    // Ruta para actualizar un vehículo
    this.rutasVehiculoAPI.put(
      "/update",
      datosVehiculoActualizar,
      validarDatos.ahora,
      controladorVehiculoActualizar.llamarActualizar
    );

    // Ruta para eliminar un vehículo
    this.rutasVehiculoAPI.delete(
      "/delete/:codVehiculo",
      datosVehiculoBorrar,
      validarDatos.ahora,
      controladorVehiculoBorrar.llamarBorrar
    );
  }
}

const rutasVehiculo = new RutasVehiculo();
export default rutasVehiculo.rutasVehiculoAPI;