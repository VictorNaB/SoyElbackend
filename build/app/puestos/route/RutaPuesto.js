"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControladorPuestoConsulta_1 = __importDefault(require("../controller/ControladorPuestoConsulta"));
const ControladoPuestoCrear_1 = __importDefault(require("../controller/ControladoPuestoCrear"));
const ControladorPuestoBorrar_1 = __importDefault(require("../controller/ControladorPuestoBorrar"));
const ControladorPuestoActualizar_1 = __importDefault(require("../controller/ControladorPuestoActualizar"));
const ValidarPuesto_1 = require("../../../config/domain/ValidarPuesto");
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
class RutaPuesto {
    constructor() {
        this.rutaPuestoApi = (0, express_1.Router)();
        this.rutaPuestoApi.get("/getall", ControladorPuestoConsulta_1.default.llamarObtenerPuestos);
        this.rutaPuestoApi.post("/add", ValidarPuesto_1.datosPuestoCrear, ValidarDatos_1.default.ahora, ControladoPuestoCrear_1.default.llamarCrearPuesto);
        this.rutaPuestoApi.delete("/delete/:codPuesto", ValidarPuesto_1.datosPuestoEliminar, ValidarDatos_1.default.ahora, ControladorPuestoBorrar_1.default.llamarBorrar);
        this.rutaPuestoApi.put("/update", ValidarPuesto_1.datosPuestoActualizar, ValidarDatos_1.default.ahora, ControladorPuestoActualizar_1.default.llamarActualizar);
    }
}
const rutaPuesto = new RutaPuesto();
exports.default = rutaPuesto.rutaPuestoApi;
