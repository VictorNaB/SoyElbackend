"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioActualizarUsuario_1 = __importDefault(require("../service/ServicioActualizarUsuario"));
const Usuario_1 = __importDefault(require("../model/Usuario"));
class ControladorActualizarUsuario extends ServicioActualizarUsuario_1.default {
    Actualizar(req, res) {
        const objTemporal = new Usuario_1.default(req.body.codUsuario, req.body.codRol, req.body.documentoUsuario, req.body.nombresUsuario, req.body.apellidosUsuario, req.body.generoUsuario, new Date(req.body.fechaNacimientoUsuario), req.body.telefonoUsuario);
        ServicioActualizarUsuario_1.default.ActualizarUsuario(objTemporal, res);
    }
}
const controladorActualizarUsuario = new ControladorActualizarUsuario();
exports.default = controladorActualizarUsuario;
