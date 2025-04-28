"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControladorConsultarUsuario_1 = __importDefault(require("../controller/ControladorConsultarUsuario"));
const ControladorCrearUsuario_1 = __importDefault(require("../controller/ControladorCrearUsuario"));
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
const ControladorActualizarUsuario_1 = __importDefault(require("../controller/ControladorActualizarUsuario"));
const ControladorEliminarUsuario_1 = __importDefault(require("../controller/ControladorEliminarUsuario"));
class RutaUsuario {
    constructor() {
        this.rutaUsuarioApi = (0, express_1.Router)();
        this.rutaUsuarioApi.get("/getall", ControladorConsultarUsuario_1.default.LlamarConsulta);
        this.rutaUsuarioApi.post("/add", ControladorCrearUsuario_1.default.Crearusuario, ValidarDatos_1.default.ahora);
        this.rutaUsuarioApi.delete("/delete/:codUsuario", ControladorEliminarUsuario_1.default.BorrarUsuario, ValidarDatos_1.default.ahora);
        this.rutaUsuarioApi.put('/update', ControladorActualizarUsuario_1.default.Actualizar, ValidarDatos_1.default.ahora);
    }
}
const rutasUsuario = new RutaUsuario();
exports.default = rutasUsuario.rutaUsuarioApi;
