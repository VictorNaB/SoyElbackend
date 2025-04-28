"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControladorServiciosDiariosConsulta_1 = __importDefault(require("../controller/ControladorServiciosDiariosConsulta"));
const ControladorServicioDiarioCrear_1 = __importDefault(require("../controller/ControladorServicioDiarioCrear"));
const ControladorEliminarServicioDiario_1 = __importDefault(require("../controller/ControladorEliminarServicioDiario"));
const ControladorServicioDiarioActualizar_1 = __importDefault(require("../controller/ControladorServicioDiarioActualizar"));
const ValidarServicioDiarios_1 = require("../../../config/domain/ValidarServicioDiarios");
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
class ruta_ServiciosDiarios {
    constructor() {
        this.rutaServiciosDiariosApi = (0, express_1.Router)();
        this.rutaServiciosDiariosApi.get("/getall", ControladorServiciosDiariosConsulta_1.default.llamarConsulta);
        this.rutaServiciosDiariosApi.post("/add", ValidarServicioDiarios_1.datosServiciodiariosCrear, ValidarDatos_1.default.ahora, ControladorServicioDiarioCrear_1.default.CrearServicio);
        this.rutaServiciosDiariosApi.delete("/delete/:CodServicioDiarios", ValidarServicioDiarios_1.datoServiciosdiariosBorrar, ValidarDatos_1.default.ahora, ControladorEliminarServicioDiario_1.default.llamarEliminar);
        this.rutaServiciosDiariosApi.put("/update", ValidarServicioDiarios_1.datosServicioDiarioActualizar, ValidarDatos_1.default.ahora, ControladorServicioDiarioActualizar_1.default.llamarActualizar);
    }
}
const Ruta_ServiciosDiarios = new ruta_ServiciosDiarios();
exports.default = Ruta_ServiciosDiarios.rutaServiciosDiariosApi;
