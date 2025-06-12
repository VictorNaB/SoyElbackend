import { Router } from "express";
import controladorPuestoconsulta from "../controller/ControladorPuestoConsulta";
import controladorPuestoCrear from "../controller/ControladoPuestoCrear";
import controladorPuestoBorrar from "../controller/ControladorPuestoBorrar";
import controladorPuestoActualizar from "../controller/ControladorPuestoActualizar";
<<<<<<< HEAD
import { datosPuestoActualizar, datosPuestoCrear, datosPuestoEliminar } from "../../../config/domain/ValidarPuesto";
=======
import { Actualizar, datosPuestoCrear, eliminar } from "../../../config/domain/ValidarPuesto";
>>>>>>> 62f9d91 (Cambios realizados)
import validarDatos from "../../../middleware/ValidarDatos";



class RutaPuesto{

    public rutaPuestoApi:Router;
    constructor(){
        this.rutaPuestoApi=Router();
        this.rutaPuestoApi.get("/getall",controladorPuestoconsulta.llamarObtenerPuestos);
        this.rutaPuestoApi.post("/add",datosPuestoCrear, validarDatos.ahora,controladorPuestoCrear.llamarCrearPuesto);
<<<<<<< HEAD
        this.rutaPuestoApi.delete("/delete/:codPuesto",datosPuestoEliminar,validarDatos.ahora,controladorPuestoBorrar.llamarBorrar);
        this.rutaPuestoApi.put("/update",datosPuestoActualizar,validarDatos.ahora, controladorPuestoActualizar.llamarActualizar)
=======
        this.rutaPuestoApi.delete("/delete/:codPuesto",eliminar,validarDatos.ahora,controladorPuestoBorrar.llamarBorrar);
        this.rutaPuestoApi.put("/update",Actualizar,validarDatos.ahora, controladorPuestoActualizar.llamarActualizar)
>>>>>>> 62f9d91 (Cambios realizados)
       
    }

}

const rutaPuesto=new RutaPuesto();
export default rutaPuesto.rutaPuestoApi;