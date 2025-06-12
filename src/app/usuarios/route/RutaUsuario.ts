import { Router } from "express";
import controladorConsultarUsuario from "../controller/ControladorConsultarUsuario";
import controladorCrearUsuario from "../controller/ControladorCrearUsuario";
import validarDatos from "../../../middleware/ValidarDatos";
import controladorActualizarUsuario from "../controller/ControladorActualizarUsuario";
import controladorEliminarUsuario from "../controller/ControladorEliminarUsuario";


class RutaUsuario{
    public rutaUsuarioApi:Router;

    constructor(){
        this.rutaUsuarioApi=Router();
        this.rutaUsuarioApi.get("/getall", controladorConsultarUsuario.LlamarConsulta);
        this.rutaUsuarioApi.post("/add",controladorCrearUsuario.Crearusuario,validarDatos.ahora);
        this.rutaUsuarioApi.delete("/delete/:codUsuario",controladorEliminarUsuario.BorrarUsuario, validarDatos.ahora);
        this.rutaUsuarioApi.put('/update',controladorActualizarUsuario.Actualizar, validarDatos.ahora)
    }
}


const rutasUsuario=new RutaUsuario();
export default rutasUsuario.rutaUsuarioApi;