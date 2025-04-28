"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioValidarlogin_1 = __importDefault(require("../service/ServicioValidarlogin"));
const Login_1 = __importDefault(require("../model/Login"));
class ControladorValidarLogin extends ServicioValidarlogin_1.default {
    llamarValidar(req, res) {
        console.log(req.body);
        const objvalidar = new Login_1.default("", "");
        objvalidar.correoAcceso = req.body.correoAcceso;
        objvalidar.claveAcceso = req.body.claveAcceso;
        ServicioValidarlogin_1.default.Validar(objvalidar, res);
    }
}
const controladorValidarLogin = new ControladorValidarLogin();
exports.default = controladorValidarLogin;
