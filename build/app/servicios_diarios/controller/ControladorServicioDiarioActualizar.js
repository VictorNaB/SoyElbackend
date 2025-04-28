"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioActualizarServiciosDiarios_1 = __importDefault(require("../service/ServicioActualizarServiciosDiarios"));
const Ser_Diarios_1 = __importDefault(require("../model/Ser_Diarios"));
class ControladorServicioDiarioActualizar extends ServicioActualizarServiciosDiarios_1.default {
    llamarActualizar(req, res) {
        const Objtemporal = new Ser_Diarios_1.default(0, 0, 0, 0, new Date(), new Date(), 0);
        Objtemporal.CodServicioDiarios = req.body.CodServicioDiarios;
        Objtemporal.CodParqueadero = req.body.CodParqueadero;
        Objtemporal.CodVehiculo = req.body.CodVehiculo;
        Objtemporal.CodPuesto = req.body.CodPuesto;
        Objtemporal.FechaInicio = new Date(req.body.FechaInicio);
        Objtemporal.FechaFin = new Date(req.body.FechaFin);
        Objtemporal.ValorDiario = req.body.ValorDiario;
        ServicioActualizarServiciosDiarios_1.default.Actualizar(Objtemporal, res);
    }
}
const controladorServicioDiarioActualizar = new ControladorServicioDiarioActualizar();
exports.default = controladorServicioDiarioActualizar;
