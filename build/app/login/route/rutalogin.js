"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControladorValidarLogin_1 = __importDefault(require("../controller/ControladorValidarLogin"));
const Validarlogin_1 = require("../../../config/domain/Validarlogin");
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
class ruta {
    constructor() {
        this.rutaloginApi = (0, express_1.Router)();
        this.rutaloginApi.post("/add/", Validarlogin_1.datosvalidar, ValidarDatos_1.default.ahora, ControladorValidarLogin_1.default.llamarValidar);
    }
}
const rutaLogin = new ruta();
exports.default = rutaLogin.rutaloginApi;
