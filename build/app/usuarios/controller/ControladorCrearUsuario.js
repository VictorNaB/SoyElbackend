"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = __importDefault(require("../model/Usuario"));
const ServicioCrearUsuario_1 = __importDefault(require("../service/ServicioCrearUsuario"));
class ControladorCrearUsuario extends ServicioCrearUsuario_1.default {
    Crearusuario(req, res) {
        const objTemporal = new Usuario_1.default(0, req.body.codRol, req.body.documentoUsuario, req.body.nombresUsuario, req.body.apellidosUsuario, req.body.generoUsuario, new Date(req.body.fechaNacimientoUsuario), req.body.telefonoUsuario);
        ServicioCrearUsuario_1.default.CrearUsuario(objTemporal, res);
    }
}
const controladorCrearUsuario = new ControladorCrearUsuario();
exports.default = controladorCrearUsuario;
