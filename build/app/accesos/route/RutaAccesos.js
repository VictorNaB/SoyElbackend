"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControladorCrearAccesos_1 = __importDefault(require("../controller/ControladorCrearAccesos"));
const ControladorConsultaAcceso_1 = __importDefault(require("../controller/ControladorConsultaAcceso"));
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
const ControladorActualizarAcceso_1 = __importDefault(require("../controller/ControladorActualizarAcceso"));
const ControladorBorrarAcceso_1 = __importDefault(require("../controller/ControladorBorrarAcceso"));
const ValidarAcceso_1 = require("../../../config/domain/ValidarAcceso");
class RutaAcceso {
    constructor() {
        this.RutaAccesoApi = (0, express_1.Router)();
        this.RutaAccesoApi.get("/getall", ControladorConsultaAcceso_1.default.Consulta);
        this.RutaAccesoApi.post("/add", ValidarAcceso_1.datosAccesoCrear, ValidarDatos_1.default.ahora, ControladorCrearAccesos_1.default.CrearAcceso);
        this.RutaAccesoApi.put("/update", ValidarAcceso_1.datosAccesoActualizar, ValidarDatos_1.default.ahora, ControladorActualizarAcceso_1.default.Actualizar);
        this.RutaAccesoApi.delete("/delete/:codUsuario", ValidarAcceso_1.datoAccesoBorrar, ValidarDatos_1.default.ahora, ControladorBorrarAcceso_1.default.Borrar);
    }
}
const rutaAcceso = new RutaAcceso();
exports.default = rutaAcceso.RutaAccesoApi;
