"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioEliminarSevicioDiario_1 = __importDefault(require("../service/ServicioEliminarSevicioDiario"));
const Ser_Diarios_1 = __importDefault(require("../model/Ser_Diarios"));
class ControladorEliminarServicioDiario extends ServicioEliminarSevicioDiario_1.default {
    llamarEliminar(req, res) {
        const codigo = Number(req.params.CodServicioDiarios);
        const objt = new Ser_Diarios_1.default(codigo, req.body.CodParqueadero, req.body.CodVehiculo, req.body.CodPuesto, new Date(req.body.FechaInicio), new Date(req.body.FechaFin), req.body.ValorDiario);
        ServicioEliminarSevicioDiario_1.default.eliminar(objt, res);
    }
}
const controladorEliminarServicioDiarios = new ControladorEliminarServicioDiario();
exports.default = controladorEliminarServicioDiarios;
