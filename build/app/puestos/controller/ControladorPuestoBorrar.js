"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioPuestoBorrar_1 = __importDefault(require("../service/ServicioPuestoBorrar"));
const Puesto_1 = __importDefault(require("../model/Puesto"));
class ControladorPuestoBorrar extends ServicioPuestoBorrar_1.default {
    llamarBorrar(req, res) {
        console.log("Cuerpo peticion", req.params);
        console.log('ID recibido para eliminar:', req.params.codPuesto);
        const codigo = Number(req.params.codPuesto);
        const objpues = new Puesto_1.default(codigo, 0, 0, "");
        ServicioPuestoBorrar_1.default.borrar(objpues, res);
    }
}
const controladorPuestoBorrar = new ControladorPuestoBorrar();
exports.default = controladorPuestoBorrar;
