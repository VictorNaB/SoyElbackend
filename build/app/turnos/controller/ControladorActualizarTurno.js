"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioActualizarTurno_1 = __importDefault(require("../service/ServicioActualizarTurno"));
const Turnos_1 = __importDefault(require("../model/Turnos"));
class ControladorActualizaeTurno extends ServicioActualizarTurno_1.default {
    llamarActualizarTurno(req, res) {
        console.log(req.body);
        const Objtemporal = new Turnos_1.default(req.body.CodTurno, req.body.CodParqueadero, req.body.DescripcionTurno, req.body.FechaTurno, req.body.HoraInicio, req.body.HoraFin);
        console.log(Objtemporal);
        ServicioActualizarTurno_1.default.ActualizarTurno(Objtemporal, res);
    }
}
const controladorActualizarTurno = new ControladorActualizaeTurno();
exports.default = controladorActualizarTurno;
