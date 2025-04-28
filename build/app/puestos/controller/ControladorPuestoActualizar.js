"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioPuestoActualizar_1 = __importDefault(require("../service/ServicioPuestoActualizar"));
const Puesto_1 = __importDefault(require("../model/Puesto"));
class ControladorPuestoActualizar extends ServicioPuestoActualizar_1.default {
    llamarActualizar(req, res) {
        console.log('Datos recibidos:', req.body);
        const Objtemporal = new Puesto_1.default(0, 0, 0, "");
        Objtemporal.codPuesto = req.body.codPuesto;
        Objtemporal.CodParqueadero = req.body.CodParqueadero;
        Objtemporal.CodTipoVehiculo = req.body.CodTipoVehiculo;
        Objtemporal.detallePuesto = req.body.detallePuesto;
        ServicioPuestoActualizar_1.default.Actualizar(Objtemporal, res);
    }
}
const controladorPuestoActualizar = new ControladorPuestoActualizar();
exports.default = controladorPuestoActualizar;
