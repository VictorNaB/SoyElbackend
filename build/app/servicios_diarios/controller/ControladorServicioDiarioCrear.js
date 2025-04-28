"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioCrearServicioDiario_1 = __importDefault(require("../service/ServicioCrearServicioDiario"));
const Ser_Diarios_1 = __importDefault(require("../model/Ser_Diarios"));
class ControladoServicioDiarioCrear extends ServicioCrearServicioDiario_1.default {
    CrearServicio(req, res) {
        const objTemporal = new Ser_Diarios_1.default(0, 0, 0, 0, new Date(), new Date(), 0);
        objTemporal.CodServicioDiarios = req.body.CodServicioDiarios;
        objTemporal.CodParqueadero = req.body.CodParqueadero;
        objTemporal.CodVehiculo = req.body.CodVehiculo;
        objTemporal.CodPuesto = req.body.CodPuesto;
        objTemporal.FechaInicio = new Date(req.body.FechaInicio);
        objTemporal.FechaFin = new Date(req.body.FechaFin);
        objTemporal.ValorDiario = req.body.ValorDiario;
        ServicioCrearServicioDiario_1.default.CrearServicio_Diario(objTemporal, res);
    }
}
const controladorServicioDiarioCrear = new ControladoServicioDiarioCrear();
exports.default = controladorServicioDiarioCrear;
