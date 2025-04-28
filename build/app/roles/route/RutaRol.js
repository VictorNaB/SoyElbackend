"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControladoRolConsultas_1 = __importDefault(require("../controller/ControladoRolConsultas"));
const ControladorRolCrear_1 = __importDefault(require("../controller/ControladorRolCrear"));
const ValidarRol_1 = require("../../../config/domain/ValidarRol");
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
const ControladorRolBorrar_1 = __importDefault(require("../controller/ControladorRolBorrar"));
const ControladorRolActualizar_1 = __importDefault(require("../controller/ControladorRolActualizar"));
class RutaRol {
    constructor() {
        this.rutalRolApi = (0, express_1.Router)();
        //Aqui el endpoint siempre ira en minuscula y ingles en este caso gettall para obtener todos los roles
        this.rutalRolApi.get("/getall", ControladoRolConsultas_1.default.llamarObtenerTodos);
        this.rutalRolApi.post("/add", ValidarRol_1.datosRolCrear, ValidarDatos_1.default.ahora, ControladorRolCrear_1.default.llamargrabarRol);
        this.rutalRolApi.delete("/delete/:codRol", ValidarRol_1.datosRolBorrar, ValidarDatos_1.default.ahora, ControladorRolBorrar_1.default.llamarRolBorrar);
        this.rutalRolApi.put("/update", ValidarRol_1.datosRolActualizar, ValidarDatos_1.default.ahora, ControladorRolActualizar_1.default.llamarActualizar);
    }
}
//el api son los endpoint
const rutasRol = new RutaRol();
exports.default = rutasRol.rutalRolApi;
