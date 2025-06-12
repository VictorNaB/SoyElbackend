import { Router } from "express";
import controladorObtenerTurnos from "../controller/ControladorObtenerTurnos";
import controladorCrearTurnos from "../controller/ControladorCrearTurnos";
import controladorTurnoEliminar from "../controller/ControladorTurnoEliminar";
import controladorActualizarTurno from "../controller/ControladorActualizarTurno";
import { validarActualizarTurno, validarCrearTurno, validarEliminarTurno } from "../../../config/domain/ValidarTurno";
import validarDatos from "../../../middleware/ValidarDatos";


class RutaTurnos{
    public rutaTurnosApi: Router;
    constructor(){
        this.rutaTurnosApi=Router();
        this.rutaTurnosApi.get("/getall", controladorObtenerTurnos.obtenerTurnos);
        this.rutaTurnosApi.post("/add",validarCrearTurno,validarDatos.ahora, controladorCrearTurnos.crearTurno);
        this.rutaTurnosApi.delete("/delete/:CodTurno",validarEliminarTurno,validarDatos.ahora, controladorTurnoEliminar.eliminarTurno);
        this.rutaTurnosApi.put("/update",validarActualizarTurno,validarDatos.ahora, controladorActualizarTurno.actualizarTurno);
    }
}

const rutaTurnos = new RutaTurnos();
export default rutaTurnos.rutaTurnosApi;