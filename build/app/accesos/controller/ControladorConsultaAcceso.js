"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioConsultarAccesos_1 = __importDefault(require("../service/ServicioConsultarAccesos"));
class ControladorConsultaAcceso extends ServicioConsultarAccesos_1.default {
    Consulta(req, res) {
        ServicioConsultarAccesos_1.default.ConsultaAccesos(res);
    }
}
const controladorConsultaAcceso = new ControladorConsultaAcceso();
exports.default = controladorConsultaAcceso;
