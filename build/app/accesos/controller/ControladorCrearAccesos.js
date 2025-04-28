"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioCrearAcessos_1 = __importDefault(require("../service/ServicioCrearAcessos"));
const Accesos_1 = __importDefault(require("../model/Accesos"));
class ControladorCrearAcceso extends ServicioCrearAcessos_1.default {
    CrearAcceso(req, res) {
        const objTemporal = new Accesos_1.default(req.body.codUsuario, req.body.correo, req.body.clave, req.body.uuid);
        ServicioCrearAcessos_1.default.crearAcceso(objTemporal, res);
    }
}
const controladorCrearAcceso = new ControladorCrearAcceso();
exports.default = controladorCrearAcceso;
