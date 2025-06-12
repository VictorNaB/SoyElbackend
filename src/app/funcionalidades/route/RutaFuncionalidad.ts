import { Router } from "express";
import controllerFunctionalityGet from "../controller/ControladorObtenerFuncionalidad";
import validarDatos from "../../../middleware/ValidarDatos";
import { datosFuncionalidadCrear, datosFunctionalityDelete, datosFuncionalidadActualizar } from "../../../config/domain/ValidarFuncionalidad";
import controllerFunctionalityCreate from "../controller/ControladorCrearFuncionalidad";
import ControladorBorrarFuncionalidad from "../controller/ControladorBorrarFuncionalidad";
import controllerFunctionalityUpdate from "../controller/ControladorActualizarFuncionalidad";

class RutaFuncionalidad {
  public rutaFuncionalidadApi: Router;

  constructor() {
    this.rutaFuncionalidadApi = Router();
    this.rutaFuncionalidadApi.get("/getall", controllerFunctionalityGet.getAll, validarDatos.ahora);
    this.rutaFuncionalidadApi.post("/add", datosFuncionalidadCrear, controllerFunctionalityCreate.create, validarDatos.ahora);
    this.rutaFuncionalidadApi.put("/update", datosFuncionalidadActualizar, controllerFunctionalityUpdate.update, validarDatos.ahora);
    this.rutaFuncionalidadApi.delete("/delete/:id", datosFunctionalityDelete, ControladorBorrarFuncionalidad.borrar, validarDatos.ahora);
  }
}

const rutaFuncionalidad = new RutaFuncionalidad();
export default rutaFuncionalidad.rutaFuncionalidadApi;