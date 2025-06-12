import { Router } from "express";
import controladorObtenerRelRolFuncionalidad from "../controller/ControladorObtenerRelRolFuncionalidad";
import controladorCrearRelRolFuncionalidad from "../controller/ControladorCrearRelRolFuncionalidad";
import controladorActualizarRelRolFuncionalidad from "../controller/ControladorActualizarRelRolFuncionalidad";
import controladorBorrarRelRolFuncionalidad from "../controller/ControladorBorrarRelRolFuncionalidad";
import validarDatos from "../../../middleware/ValidarDatos";
import { 
  datosRelRolFuncionalidadCrear,
  datosRelRolFuncionalidadActualizar,
  datosRelRolFuncionalidadEliminar
} from "../../../config/domain/ValidadorRelRolFuncionalidad";

class RutaRelRolFuncionalidad {
  public rutaRelRolFuncionalidadApi: Router;

  constructor() {
    this.rutaRelRolFuncionalidadApi = Router();
    this.configurarRutas();
  }

  private configurarRutas(): void {
    // Obtener todas las relaciones
    this.rutaRelRolFuncionalidadApi.get(
      "/getAll",
      controladorObtenerRelRolFuncionalidad.Obtener
    );

    // Crear nueva relación
    this.rutaRelRolFuncionalidadApi.post(
      "/add",
      datosRelRolFuncionalidadCrear,
      validarDatos.ahora,
      controladorCrearRelRolFuncionalidad.crear
    );

    // Actualizar relación
    this.rutaRelRolFuncionalidadApi.put(
      "/update",
      datosRelRolFuncionalidadActualizar,
      validarDatos.ahora,
      controladorActualizarRelRolFuncionalidad.actualizar
    );

    // Eliminar relación
    this.rutaRelRolFuncionalidadApi.delete(
      "/delete/:codRol/:codFuncionalidad",
      datosRelRolFuncionalidadEliminar,
      validarDatos.ahora,
      controladorBorrarRelRolFuncionalidad.borrar
    );
  }
}

const rutaRelRolFuncionalidad = new RutaRelRolFuncionalidad();
export default rutaRelRolFuncionalidad.rutaRelRolFuncionalidadApi;