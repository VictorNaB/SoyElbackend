import { Router } from "express";
import controladorPuestoconsulta from "../controller/ControladorPuestoConsulta";
import controladorPuestoCrear from "../controller/ControladoPuestoCrear";
import controladorPuestoBorrar from "../controller/ControladorPuestoBorrar";
import controladorPuestoActualizar from "../controller/ControladorPuestoActualizar";
import { datosPuestoActualizar, datosPuestoCrear, datosPuestoEliminar } from "../../../config/domain/ValidarPuesto";
import validarDatos from "../../../middleware/ValidarDatos";



class RutaPuesto{

    public rutaPuestoApi:Router;
    constructor(){
        this.rutaPuestoApi=Router();
        this.rutaPuestoApi.get("/getall",controladorPuestoconsulta.llamarObtenerPuestos);
        this.rutaPuestoApi.post("/add",datosPuestoCrear, validarDatos.ahora,controladorPuestoCrear.llamarCrearPuesto);
        this.rutaPuestoApi.delete("/delete/:codPuesto",datosPuestoEliminar,validarDatos.ahora,controladorPuestoBorrar.llamarBorrar);
        this.rutaPuestoApi.put("/update",datosPuestoActualizar,validarDatos.ahora, controladorPuestoActualizar.llamarActualizar)
       
    }

}

const rutaPuesto=new RutaPuesto();
export default rutaPuesto.rutaPuestoApi;