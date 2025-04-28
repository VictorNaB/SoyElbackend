"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioCrearRel_Turno_Usuario_1 = __importDefault(require("../service/ServicioCrearRel_Turno_Usuario"));
const Rel_Turno_Usuario_1 = __importDefault(require("../model/Rel_Turno_Usuario"));
class ControladorCrearRel_Turno_Usuario extends ServicioCrearRel_Turno_Usuario_1.default {
    crearPuesto(req, res) {
        console.log(req.body);
        const objCreado = new Rel_Turno_Usuario_1.default(0, 0, 0);
        objCreado.CodTurno = req.body.CodTurno;
        objCreado.CodUsuario = req.body.CodUsuario;
        ServicioCrearRel_Turno_Usuario_1.default.crearTurnoUsuario(objCreado, res);
    }
}
const controladorCrearRel_Turno_Usuario = new ControladorCrearRel_Turno_Usuario();
exports.default = controladorCrearRel_Turno_Usuario;
