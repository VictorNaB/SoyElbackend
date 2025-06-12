import { Router } from "express";
import controladorCrearAcceso from "../controller/ControladorCrearAccesos"; 
import controladorConsultaAcceso from "../controller/ControladorConsultaAcceso";
import validarDatos from "../../../middleware/ValidarDatos";
import controladorActualizarAcceso from "../controller/ControladorActualizarAcceso"; 
import controladorBorrarAcceso from "../controller/ControladorBorrarAcceso"; 
<<<<<<< HEAD
import { datoAccesoBorrar, datosAccesoActualizar, datosAccesoCrear } from "../../../config/domain/ValidarAcceso";
=======
>>>>>>> 62f9d91 (Cambios realizados)

class RutaAcceso {
    public RutaAccesoApi: Router;

    constructor(){
        this.RutaAccesoApi = Router();
        this.RutaAccesoApi.get("/getall", controladorConsultaAcceso.Consulta);
<<<<<<< HEAD
        this.RutaAccesoApi.post("/add",datosAccesoCrear,validarDatos.ahora, controladorCrearAcceso.CrearAcceso);
        this.RutaAccesoApi.put("/update",datosAccesoActualizar,validarDatos.ahora, controladorActualizarAcceso.Actualizar);
        this.RutaAccesoApi.delete("/delete/:codUsuario",datoAccesoBorrar ,validarDatos.ahora,controladorBorrarAcceso.Borrar);
=======
        this.RutaAccesoApi.post("/add",validarDatos.ahora, controladorCrearAcceso.CrearAcceso);
        this.RutaAccesoApi.put("/update",validarDatos.ahora, controladorActualizarAcceso.Actualizar);
        this.RutaAccesoApi.delete("/delete/:codUsuario", validarDatos.ahora,controladorBorrarAcceso.Borrar);
>>>>>>> 62f9d91 (Cambios realizados)
    }
}
const rutaAcceso=new RutaAcceso();
export default rutaAcceso.RutaAccesoApi;