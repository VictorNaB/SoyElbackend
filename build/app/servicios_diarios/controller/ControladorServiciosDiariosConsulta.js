"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Servicio_DiariosConsulta_1 = __importDefault(require("../service/Servicio_DiariosConsulta"));
class ControladorServiciosDiariosConsulta extends Servicio_DiariosConsulta_1.default {
    llamarConsulta(req, res) {
        Servicio_DiariosConsulta_1.default.ConsultaDiarios(res);
    }
}
const controladorServiciosDiariosConsulta = new ControladorServiciosDiariosConsulta();
exports.default = controladorServiciosDiariosConsulta;
