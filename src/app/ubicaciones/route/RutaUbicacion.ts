import { Router } from "express";

import { validarCrearUbicacion,datosUbicacionBorrar, datosUbicacionActualizar } from "../../../config/domain/ValidarUbicacion";
import validarDatos from "../../../middleware/ValidarDatos";
import controladorUbicacionCrear from "../controller/ControladorUbicacionCrear";
import controladorUbicacionBorrar from "../controller/ControladorUbicacionBorrar";
import controladorUbicacionActualizar from "../controller/ControladorUbicacionActualizar";
import controladorUbicacionConsulta from "../controller/ControladorUbicacionConsulta";

class RutaUbicacion {
  public rutaUbicacionApi: Router;

  constructor() {
    this.rutaUbicacionApi = Router();

    this.rutaUbicacionApi.get(
      "/getAll",
      controladorUbicacionConsulta.obtenerTodos
    );
    this.rutaUbicacionApi.post(
      "/add",
      validarCrearUbicacion,
      validarDatos.ahora,
      controladorUbicacionCrear.llamarCrearUbicacion
    ); //hacer el validar
    this.rutaUbicacionApi.delete(
      "/delete/:codUbicacion",
      datosUbicacionBorrar,
      validarDatos.ahora,
      controladorUbicacionBorrar.llamarBorrarUbicacion
    ); //hacer el validar
    this.rutaUbicacionApi.put(
      "/update",
      datosUbicacionActualizar,
      validarDatos.ahora,
      controladorUbicacionActualizar.llamarActualizarUbicacion
    );
  }
}

const rutaUbicacion = new RutaUbicacion();
export default rutaUbicacion.rutaUbicacionApi; // exporta una propiedad de una instancia