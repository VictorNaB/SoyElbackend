"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioConsultarTurnoUsuario_1 = __importDefault(require("../service/ServicioConsultarTurnoUsuario"));
class ControladorConsultarRel_Turno_Usuario extends ServicioConsultarTurnoUsuario_1.default {
    llamarConsultarTurnoUsuario(req, res) {
        ServicioConsultarTurnoUsuario_1.default.consultarTurnoUsuario(res);
    }
}
const controladorConsultarRel_Turno_Usuario = new ControladorConsultarRel_Turno_Usuario();
exports.default = controladorConsultarRel_Turno_Usuario;
