import { Router } from "express";
import controladorConsultarTurno from "../controller/ControladorConsultarTurno";
import controladorCrearTurno from "../controller/ControladorCrearTurno";
import controladorEliminarTurno from "../controller/ControladorEliminarTurno";
import controladorActualizarTurno from "../controller/ControladorActualizarTurno";
import { datosTurnosActualizar, datosTurnoCrear, datoTurnosBorrar } from "../../../config/domain/ValidarTurno";
import validarDatos from "../../../middleware/ValidarDatos";


class Ruta_Turno{
    public rutaTurnoApi:Router;
    constructor(){
        this.rutaTurnoApi=Router();
        this.rutaTurnoApi.get("/getall",controladorConsultarTurno.llamarConsultarTurno);
        this.rutaTurnoApi.post("/add",datosTurnoCrear,validarDatos.ahora,controladorCrearTurno.LlamarCrearTurno);
        this.rutaTurnoApi.delete("/delete/:CodTurno",datoTurnosBorrar,validarDatos.ahora,controladorEliminarTurno.llamarEliminarTurno);
        this.rutaTurnoApi.put("/update", datosTurnosActualizar,validarDatos.ahora,controladorActualizarTurno.llamarActualizarTurno)
    }


}

const rutaTurno=new Ruta_Turno();
export default rutaTurno.rutaTurnoApi;