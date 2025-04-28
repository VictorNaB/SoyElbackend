"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioActualizarRel_Turno_Usuario_1 = __importDefault(require("../service/ServicioActualizarRel_Turno_Usuario"));
const Rel_Turno_Usuario_1 = __importDefault(require("../model/Rel_Turno_Usuario"));
class ControladorActualizarRel_Turno_Usuario extends ServicioActualizarRel_Turno_Usuario_1.default {
    ActualizarTurnoUsuario(req, res) {
        const Objtemporal = new Rel_Turno_Usuario_1.default(0, 0, 0);
        Objtemporal.CodTurnoUsuario = req.body.CodTurnoUsuario;
        Objtemporal.CodTurno = req.body.CodTurno;
        Objtemporal.CodUsuario = req.body.CodUsuario;
        ServicioActualizarRel_Turno_Usuario_1.default.ActualizarTurnoUsuario(Objtemporal, res);
    }
}
const controladorActualizarRel_Turno_Usuario = new ControladorActualizarRel_Turno_Usuario();
exports.default = controladorActualizarRel_Turno_Usuario;
