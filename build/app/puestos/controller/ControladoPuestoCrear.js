"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioPuestoCrear_1 = __importDefault(require("../service/ServicioPuestoCrear"));
const Puesto_1 = __importDefault(require("../model/Puesto"));
class ControladorPuestoCrear extends ServicioPuestoCrear_1.default {
    llamarCrearPuesto(req, res) {
        console.log("Datos recibidos:", req.body);
        const ObjCreo = new Puesto_1.default(0, 0, 0, "");
        ObjCreo.CodParqueadero = req.body.CodParqueadero;
        ObjCreo.CodTipoVehiculo = req.body.CodTipoVehiculo;
        ObjCreo.detallePuesto = req.body.detallePuesto;
        console.log(ObjCreo);
        ServicioPuestoCrear_1.default.CrearPuesto(ObjCreo, res);
    }
}
const controladorPuestoCrear = new ControladorPuestoCrear();
exports.default = controladorPuestoCrear;
