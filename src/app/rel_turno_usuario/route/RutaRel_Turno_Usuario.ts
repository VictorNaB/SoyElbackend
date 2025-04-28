import { Router } from "express";
import controladorConsultarRel_Turno_Usuario from "../controller/ControladorConsultarRel_Turno_Usuario";
import ControladorCrearRel_Turno_Usuario from "../controller/ControladorCrearRel_Turno_Usuario";
import controladorCrearRel_Turno_Usuario from "../controller/ControladorCrearRel_Turno_Usuario";
import controladorEliminarRel_Turno_Usuario from "../controller/ControladorEliminarRel_Turno_Usuario";
import controladorActualizarRel_Turno_Usuario from "../controller/ControladorActualizarRel_Turno_Usuario";
import { datoRelTurnoUsuarioBorrar, datosRelTurnoUsuarioActualizar, datosRelTurnoUsuarioCrear } from "../../../config/domain/ValidarRel_Puesto_Usuario";
import validarDatos from "../../../middleware/ValidarDatos";


class RutaRel_Turno_Usuario{
    public rutaServicioRelTurnoUsuarioApi:Router;
    constructor(){
        this.rutaServicioRelTurnoUsuarioApi=Router();
        this.rutaServicioRelTurnoUsuarioApi.get("/getall",controladorConsultarRel_Turno_Usuario.llamarConsultarTurnoUsuario);
        this.rutaServicioRelTurnoUsuarioApi.post("/add",controladorCrearRel_Turno_Usuario.crearPuesto);
        this.rutaServicioRelTurnoUsuarioApi.delete("/delete/:CodTurnoUsuario",datoRelTurnoUsuarioBorrar,validarDatos.ahora,controladorEliminarRel_Turno_Usuario.llamarEliminar);
        this.rutaServicioRelTurnoUsuarioApi.put("/update", datosRelTurnoUsuarioActualizar,controladorActualizarRel_Turno_Usuario.ActualizarTurnoUsuario);
        
    }
}

const Ruta_RelTurnoUsuario= new RutaRel_Turno_Usuario();
export default Ruta_RelTurnoUsuario.rutaServicioRelTurnoUsuarioApi
