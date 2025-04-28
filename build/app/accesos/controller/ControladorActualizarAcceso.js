"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioActualizarAcceso_1 = __importDefault(require("../service/ServicioActualizarAcceso"));
const Accesos_1 = __importDefault(require("../model/Accesos"));
class ControladorActualizarAcceso extends ServicioActualizarAcceso_1.default {
    Actualizar(req, res) {
        const objTemporal = new Accesos_1.default(req.body.codUsuario, req.body.correo, req.body.clave, req.body.uuid);
        ServicioActualizarAcceso_1.default.ActualizarAcceso(objTemporal, res);
    }
}
const controladorActualizarAcceso = new ControladorActualizarAcceso();
exports.default = controladorActualizarAcceso;
