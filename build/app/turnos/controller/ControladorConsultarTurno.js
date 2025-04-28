"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioConsutarTurno_1 = __importDefault(require("../service/ServicioConsutarTurno"));
class ControladorConsultarTurno extends ServicioConsutarTurno_1.default {
    llamarConsultarTurno(req, res) {
        ServicioConsutarTurno_1.default.ConsultarTurno(res);
    }
}
const controladorConsultarTurno = new ControladorConsultarTurno();
exports.default = controladorConsultarTurno;
