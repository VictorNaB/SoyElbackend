"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioConsultarUsuario_1 = __importDefault(require("../service/ServicioConsultarUsuario"));
class ControladorConsultarUsuario extends ServicioConsultarUsuario_1.default {
    LlamarConsulta(req, res) {
        ServicioConsultarUsuario_1.default.consultarUsuario(res);
    }
}
const controladorConsultarUsuario = new ControladorConsultarUsuario();
exports.default = controladorConsultarUsuario;
