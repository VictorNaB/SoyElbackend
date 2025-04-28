"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControladorConsultarTurno_1 = __importDefault(require("../controller/ControladorConsultarTurno"));
const ControladorCrearTurno_1 = __importDefault(require("../controller/ControladorCrearTurno"));
const ControladorEliminarTurno_1 = __importDefault(require("../controller/ControladorEliminarTurno"));
const ControladorActualizarTurno_1 = __importDefault(require("../controller/ControladorActualizarTurno"));
const ValidarTurno_1 = require("../../../config/domain/ValidarTurno");
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
class Ruta_Turno {
    constructor() {
        this.rutaTurnoApi = (0, express_1.Router)();
        this.rutaTurnoApi.get("/getall", ControladorConsultarTurno_1.default.llamarConsultarTurno);
        this.rutaTurnoApi.post("/add", ValidarTurno_1.datosTurnoCrear, ValidarDatos_1.default.ahora, ControladorCrearTurno_1.default.LlamarCrearTurno);
        this.rutaTurnoApi.delete("/delete/:CodTurno", ValidarTurno_1.datoTurnosBorrar, ValidarDatos_1.default.ahora, ControladorEliminarTurno_1.default.llamarEliminarTurno);
        this.rutaTurnoApi.put("/update", ValidarTurno_1.datosTurnosActualizar, ValidarDatos_1.default.ahora, ControladorActualizarTurno_1.default.llamarActualizarTurno);
    }
}
const rutaTurno = new Ruta_Turno();
exports.default = rutaTurno.rutaTurnoApi;
