import { Router } from "express";
import controladorCrearAcceso from "../controller/ControladorCrearAccesos"; 
import controladorConsultaAcceso from "../controller/ControladorConsultaAcceso";
import validarDatos from "../../../middleware/ValidarDatos";
import controladorActualizarAcceso from "../controller/ControladorActualizarAcceso"; 
import controladorBorrarAcceso from "../controller/ControladorBorrarAcceso"; 
import { datoAccesoBorrar, datosAccesoActualizar, datosAccesoCrear } from "../../../config/domain/ValidarAcceso";

class RutaAcceso {
    public RutaAccesoApi: Router;

    constructor(){
        this.RutaAccesoApi = Router();
        this.RutaAccesoApi.get("/getall", controladorConsultaAcceso.Consulta);
        this.RutaAccesoApi.post("/add",datosAccesoCrear,validarDatos.ahora, controladorCrearAcceso.CrearAcceso);
        this.RutaAccesoApi.put("/update",datosAccesoActualizar,validarDatos.ahora, controladorActualizarAcceso.Actualizar);
        this.RutaAccesoApi.delete("/delete/:codUsuario",datoAccesoBorrar ,validarDatos.ahora,controladorBorrarAcceso.Borrar);
    }
}
const rutaAcceso=new RutaAcceso();
export default rutaAcceso.RutaAccesoApi;