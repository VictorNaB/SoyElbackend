import { Router } from "express";
import controladorServicioConsulta from "../controller/ControladorServicioConsulta";
import controladorServicioOtroCrear from "../controller/ControladorServicioOtroCrear";
import validarDatos from "../../../middleware/ValidarDatos";
import { datosServciosOtrosBorrar, datosServicioOtroActualizar, datosServicioOtroCrear } from "../../../config/domain/validarServicoOtro";
import controladorServicioOtroBorrar from "../controller/ControladorServicioOtroBorrar";
import controladorServicioOtroActualizar from "../controller/ControladorServicioOtroActualizar";

class RutaServicioOtro{
    public rutaServicioOtroApi: Router;
    constructor()
    {
        this.rutaServicioOtroApi = Router();
        this.rutaServicioOtroApi.get("/getAll",controladorServicioConsulta.obtenerTodos);
        this.rutaServicioOtroApi.post("/add",datosServicioOtroCrear,validarDatos.ahora,controladorServicioOtroCrear.crearOtroServicio);
        this.rutaServicioOtroApi.delete("/delete/:codServicioOtro?",datosServciosOtrosBorrar,validarDatos.ahora,controladorServicioOtroBorrar.servicioOtroBorrar);
        this.rutaServicioOtroApi.put("/update",datosServicioOtroActualizar, validarDatos.ahora,controladorServicioOtroActualizar.servicioOtroActualizar )
    }
}

const rutaServicioOtro = new RutaServicioOtro();
export default rutaServicioOtro;