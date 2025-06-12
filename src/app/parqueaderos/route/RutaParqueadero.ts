import { Router } from "express";
import instanciaControladorParqueaderoConsulta from "../controller/ControladorParqueaderoConsulta";
import controladorParqueaderoCrear from "../controller/ControladorParqueaderoCrear";
import controladorParqueaderoBorrar from "../controller/ControladorParqueaderoBorrar";
import controladorParqueaderoActualizar from "../controller/ControladorParqueaderoActualizar";
import validarDatos from "../../../middleware/ValidarDatos";
import { validarCrearParqueadero,datosParqueaderoBorrar,datosParqueaderoActualizar } from "../../../config/domain/ValidarParqueadero";

class RutaParqueadero {
  public rutaParqueaderoApi: Router;

  constructor() {
    this.rutaParqueaderoApi = Router();

    this.rutaParqueaderoApi.get(
      "/getAll",
      instanciaControladorParqueaderoConsulta.obtenerTodos
    );
    this.rutaParqueaderoApi.post(
      "/add",
      validarCrearParqueadero,
      validarDatos.ahora,
      controladorParqueaderoCrear.crearParqueadero
    );
    this.rutaParqueaderoApi.delete(
      "/delete/:codParqueadero",
      datosParqueaderoBorrar,
      validarDatos.ahora,
      controladorParqueaderoBorrar.borrarParqueadero
    );
    this.rutaParqueaderoApi.put(
      "/update",
      datosParqueaderoActualizar,
      validarDatos.ahora,
      controladorParqueaderoActualizar.actualizarParqueadero
    );
  }
}

const rutaParqueadero = new RutaParqueadero();
export default rutaParqueadero.rutaParqueaderoApi;