import { Router } from "express";
import controladorServiciosDiariosConsulta from "../controller/ControladorServiciosDiariosConsulta";
import controladorServicioDiarioCrear from "../controller/ControladorServicioDiarioCrear";
import controladorEliminarServicioDiarios from "../controller/ControladorEliminarServicioDiario";
import controladorServicioDiarioActualizar from "../controller/ControladorServicioDiarioActualizar";
<<<<<<< HEAD
import { datosServicioDiarioActualizar, datoServiciosdiariosBorrar, datosServiciodiariosCrear } from "../../../config/domain/ValidarServicioDiarios";
=======
import { datosActualizar, datoServiciosdiariosBorrar, datosServiciodiariosCrear } from "../../../config/domain/ValidarServicioDiarios";
>>>>>>> 62f9d91 (Cambios realizados)
import validarDatos from "../../../middleware/ValidarDatos";


class ruta_ServiciosDiarios{


    public rutaServiciosDiariosApi:Router;
    constructor(){
        this.rutaServiciosDiariosApi=Router();
        this.rutaServiciosDiariosApi.get("/getall", controladorServiciosDiariosConsulta.llamarConsulta);
        this.rutaServiciosDiariosApi.post("/add",datosServiciodiariosCrear,validarDatos.ahora, controladorServicioDiarioCrear.CrearServicio);
        this.rutaServiciosDiariosApi.delete("/delete/:CodServicioDiarios",datoServiciosdiariosBorrar,validarDatos.ahora, controladorEliminarServicioDiarios.llamarEliminar);
<<<<<<< HEAD
        this.rutaServiciosDiariosApi.put("/update", datosServicioDiarioActualizar,validarDatos.ahora, controladorServicioDiarioActualizar.llamarActualizar);
=======
        this.rutaServiciosDiariosApi.put("/update", datosActualizar,validarDatos.ahora, controladorServicioDiarioActualizar.llamarActualizar)
>>>>>>> 62f9d91 (Cambios realizados)
    }
}

const Ruta_ServiciosDiarios=new ruta_ServiciosDiarios();
export default Ruta_ServiciosDiarios.rutaServiciosDiariosApi;