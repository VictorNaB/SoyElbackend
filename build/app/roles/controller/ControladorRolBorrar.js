"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rol_1 = __importDefault(require("../model/Rol"));
const ServicioRolBorrar_1 = __importDefault(require("../service/ServicioRolBorrar"));
class ControladorRolBorrar extends ServicioRolBorrar_1.default {
    llamarRolBorrar(req, res) {
        const codigo = Number(req.params.codRol);
        const ObjRol = new Rol_1.default(codigo, "");
        ServicioRolBorrar_1.default.borrar(ObjRol, res);
    }
}
const controladorRolBorrar = new ControladorRolBorrar();
exports.default = controladorRolBorrar;
