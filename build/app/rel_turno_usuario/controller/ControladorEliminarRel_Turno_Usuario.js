"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioEliminarRel_Turno_Usuario_1 = __importDefault(require("../service/ServicioEliminarRel_Turno_Usuario"));
const Rel_Turno_Usuario_1 = __importDefault(require("../model/Rel_Turno_Usuario"));
class ControladorEliminarRel_Turno_Usuario extends ServicioEliminarRel_Turno_Usuario_1.default {
    llamarEliminar(req, res) {
        console.log("Codigo", req.params);
        const codigo = Number(req.params.CodTurnoUsuario);
        const obj = new Rel_Turno_Usuario_1.default(codigo, 0, 0);
        ServicioEliminarRel_Turno_Usuario_1.default.EliminarTurnoUsuario(obj, res);
    }
}
const controladorEliminarRel_Turno_Usuario = new ControladorEliminarRel_Turno_Usuario();
exports.default = controladorEliminarRel_Turno_Usuario;
