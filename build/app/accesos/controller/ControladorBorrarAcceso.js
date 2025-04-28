"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Accesos_1 = __importDefault(require("../model/Accesos"));
const ServicioBorrarAcceso_1 = __importDefault(require("../service/ServicioBorrarAcceso"));
class ControllerAccessDelete extends ServicioBorrarAcceso_1.default {
    Borrar(req, res) {
        const objTemporal = new Accesos_1.default(parseInt(req.params.codUsuario), "", "", "");
        ServicioBorrarAcceso_1.default.BorrarAcceso(objTemporal, res);
    }
}
const controladorBorrarAcceso = new ControllerAccessDelete();
exports.default = controladorBorrarAcceso;
