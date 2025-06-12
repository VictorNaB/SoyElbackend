import { Router} from "express";
import controladorServicioConsulta from "../controller/ControladorIngresoServicioOtroConsulta";
import validarDatos from "../../../middleware/ValidarDatos";
import { validarIngresoServicioOtroCrear, validarIngresoServicioOtroBorrar,validarIngresoServicioOtroActualizar } from "../../../config/domain/validarIngresoServicioOtro";
import controladorIngresoServicioOtroCrear from "../controller/ControladorIngresoServicioCrear";
import controladorIngresoServicioOtroBorrar from "../controller/ControladorIngresoServicioOtroBorrar";
import controladorIngresoServicioOtroActualizar from "../controller/ControladorIngresoServicioOtroActualizar";


class RutaIngresoServicioOtro
{
    public rutaIngresoServicioApi : Router;
    constructor()
    {
        this.rutaIngresoServicioApi = Router();
        this.rutaIngresoServicioApi.get("/getall", controladorServicioConsulta.obtenerTodo );
        this.rutaIngresoServicioApi.post("/add",validarIngresoServicioOtroCrear,validarDatos.ahora,controladorIngresoServicioOtroCrear.crear);
        this.rutaIngresoServicioApi.delete("/delete/:codIngresoServicioOtro?",validarIngresoServicioOtroBorrar,validarDatos.ahora,controladorIngresoServicioOtroBorrar.borrar);
        this.rutaIngresoServicioApi.put("/update",validarIngresoServicioOtroActualizar,validarDatos.ahora,controladorIngresoServicioOtroActualizar.actualizar);

        
    }
}
const rutaIngresoServicio = new RutaIngresoServicioOtro();
export default rutaIngresoServicio.rutaIngresoServicioApi;