"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Turnos_1 = __importDefault(require("../model/Turnos"));
const ServicioCrearTurno_1 = __importDefault(require("../service/ServicioCrearTurno"));
class ControladorCrearTurno extends ServicioCrearTurno_1.default {
    LlamarCrearTurno(req, res) {
        console.log(req.body);
        const objCreado = new Turnos_1.default(0, 0, "", "", "", "");
        objCreado.CodParqueadero = req.body.CodParqueadero;
        objCreado.DescripcionTurno = req.body.DescripcionTurno;
        objCreado.FechaTurno = req.body.FechaTurno;
        objCreado.HoraInicio = req.body.HoraInicio;
        objCreado.HoraFin = req.body.HoraFin;
        ServicioCrearTurno_1.default.CrearTurno(objCreado, res);
    }
}
const controladorCrearTurno = new ControladorCrearTurno();
exports.default = controladorCrearTurno;
