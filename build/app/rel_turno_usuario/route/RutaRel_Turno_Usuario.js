"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControladorConsultarRel_Turno_Usuario_1 = __importDefault(require("../controller/ControladorConsultarRel_Turno_Usuario"));
const ControladorCrearRel_Turno_Usuario_1 = __importDefault(require("../controller/ControladorCrearRel_Turno_Usuario"));
const ControladorEliminarRel_Turno_Usuario_1 = __importDefault(require("../controller/ControladorEliminarRel_Turno_Usuario"));
const ControladorActualizarRel_Turno_Usuario_1 = __importDefault(require("../controller/ControladorActualizarRel_Turno_Usuario"));
const ValidarRel_Puesto_Usuario_1 = require("../../../config/domain/ValidarRel_Puesto_Usuario");
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
class RutaRel_Turno_Usuario {
    constructor() {
        this.rutaServicioRelTurnoUsuarioApi = (0, express_1.Router)();
        this.rutaServicioRelTurnoUsuarioApi.get("/getall", ControladorConsultarRel_Turno_Usuario_1.default.llamarConsultarTurnoUsuario);
        this.rutaServicioRelTurnoUsuarioApi.post("/add", ControladorCrearRel_Turno_Usuario_1.default.crearPuesto);
        this.rutaServicioRelTurnoUsuarioApi.delete("/delete/:CodTurnoUsuario", ValidarRel_Puesto_Usuario_1.datoRelTurnoUsuarioBorrar, ValidarDatos_1.default.ahora, ControladorEliminarRel_Turno_Usuario_1.default.llamarEliminar);
        this.rutaServicioRelTurnoUsuarioApi.put("/update", ValidarRel_Puesto_Usuario_1.datosRelTurnoUsuarioActualizar, ControladorActualizarRel_Turno_Usuario_1.default.ActualizarTurnoUsuario);
    }
}
const Ruta_RelTurnoUsuario = new RutaRel_Turno_Usuario();
exports.default = Ruta_RelTurnoUsuario.rutaServicioRelTurnoUsuarioApi;
