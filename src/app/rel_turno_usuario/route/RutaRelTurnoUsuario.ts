import { Router } from "express";
import controladorObtenerRelTurnoUsuario from "../controller/ControladorObtenerRelTurnoUsuario";
import controladorCrearRelTurnoUsuario from "../controller/ControladorCrearRelTurnoUsuario";
import controladorEliminarTurnoUsuario from "../controller/ControladorEliminarRelTurnoUsuario";
import controladorActualizarRelTurnoUsuario from "../controller/ControladorActualizarRelTurnoUsuario";
import { validarActualizarRelTurnoUsuario, validarCrearRelTurnoUsuario, validarEliminarRelTurnoUsuario } from "../../../config/domain/ValidarRelTurnoUsuario";
import validarDatos from "../../../middleware/ValidarDatos";



class RutaRelTurnoUsuario {
    
    public RutaRelTurnoUsuarioApi:Router;
    constructor(){
        this.RutaRelTurnoUsuarioApi=Router();
        this.RutaRelTurnoUsuarioApi.get("/getall", controladorObtenerRelTurnoUsuario.llamarConsulta);
        this.RutaRelTurnoUsuarioApi.post("/add",validarCrearRelTurnoUsuario,validarDatos.ahora, controladorCrearRelTurnoUsuario.CrearRelTurnoUsuario);
        this.RutaRelTurnoUsuarioApi.delete("/delete/:CodTurnoUsuario",validarEliminarRelTurnoUsuario,validarDatos.ahora,controladorEliminarTurnoUsuario.llamarEliminar);
        this.RutaRelTurnoUsuarioApi.put("/update",validarActualizarRelTurnoUsuario,validarDatos.ahora ,controladorActualizarRelTurnoUsuario.llamarActualizar);

    }
}

const rutaRelTurnoUsuario= new RutaRelTurnoUsuario();
export default rutaRelTurnoUsuario.RutaRelTurnoUsuarioApi;
