import { Router } from "express";
import controladorIngresoConsultar from "../controller/ControladorIngresoConsultar";
import controladorIngresoActualizar from "../controller/ControladorIngresoActulizar";
import controladorIngresoGrabar from "../controller/ControladorIngresoGrabar";

import controladorIngresoBorrar from "../controller/ControladorIngresoBorrar";
import {
    validarIngresoActualizar,
  validarIngresoBorrar,
  validarIngresoCrear,
} from "../../../config/domain/ValidarIngreso";
import validarDatos from "../../../middleware/ValidarDatos";

class RutaIngreso {
  public rutaIngresoApi: Router;
  constructor() {
    this.rutaIngresoApi = Router();
    this.rutaIngresoApi.post(
      "/add",
      validarIngresoCrear,
      validarDatos.ahora,
      controladorIngresoGrabar.grabarIngreso
    );
    this.rutaIngresoApi.get("/getAll", controladorIngresoConsultar.obtenerTodo);
    this.rutaIngresoApi.put("/update",validarIngresoActualizar,validarDatos.ahora, controladorIngresoActualizar.actualizar);
    this.rutaIngresoApi.delete(
      "/delete/:codIngreso?",
      validarIngresoBorrar,
      validarDatos.ahora,
      controladorIngresoBorrar.borrar
    );
  }
}
const rutaIngreso = new RutaIngreso();
export default rutaIngreso.rutaIngresoApi;
