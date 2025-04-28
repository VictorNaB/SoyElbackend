import { Router } from "express";
import controladorRolConsulta from "../controller/ControladoRolConsultas";
import controladorRolCrear from "../controller/ControladorRolCrear";
import {
  datosRolActualizar,
  datosRolBorrar,
  datosRolCrear,
} from "../../../config/domain/ValidarRol";
import validarDatos from "../../../middleware/ValidarDatos";
import controladorRolBorrar from "../controller/ControladorRolBorrar";
import controladorRolActualizar from "../controller/ControladorRolActualizar";

class RutaRol {
  public rutalRolApi: Router;

  constructor() {
    this.rutalRolApi = Router();
    //Aqui el endpoint siempre ira en minuscula y ingles en este caso gettall para obtener todos los roles
    this.rutalRolApi.get("/getall", controladorRolConsulta.llamarObtenerTodos);
    this.rutalRolApi.post(
      "/add",
      datosRolCrear,
      validarDatos.ahora,
      controladorRolCrear.llamargrabarRol
    );
    this.rutalRolApi.delete(
      "/delete/:codRol",
      datosRolBorrar,
      validarDatos.ahora,
      controladorRolBorrar.llamarRolBorrar
    );
    this.rutalRolApi.put(
      "/update",
      datosRolActualizar,
      validarDatos.ahora,
      controladorRolActualizar.llamarActualizar
    );
  }
}

//el api son los endpoint

const rutasRol = new RutaRol();
export default rutasRol.rutalRolApi;
