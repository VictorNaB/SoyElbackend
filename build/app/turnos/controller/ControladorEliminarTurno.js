"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioEliminarTurno_1 = __importDefault(require("../service/ServicioEliminarTurno"));
const Turnos_1 = __importDefault(require("../model/Turnos"));
class ControladorEliminarTurno extends ServicioEliminarTurno_1.default {
    llamarEliminarTurno(req, res) {
        const codigo = Number(req.params.CodTurno);
        const objeliminado = new Turnos_1.default(codigo, 0, "", "", "", "");
        ServicioEliminarTurno_1.default.Eliminar(objeliminado, res);
    }
}
const controladorEliminarTurno = new ControladorEliminarTurno();
exports.default = controladorEliminarTurno;
