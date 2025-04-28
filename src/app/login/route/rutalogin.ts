import { Router } from "express";
import controladorValidarLogin from "../controller/ControladorValidarLogin";
import { datosvalidar } from "../../../config/domain/Validarlogin";
import validarDatos from "../../../middleware/ValidarDatos";



class ruta{

    rutaloginApi:Router;

    constructor(){
        this.rutaloginApi=Router();
        this.rutaloginApi.post("/add/",datosvalidar,validarDatos.ahora, controladorValidarLogin.llamarValidar)   
    }

}
const rutaLogin= new ruta();
export default rutaLogin.rutaloginApi;