"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosPuestoActualizar = exports.datosPuestoEliminar = exports.datosPuestoCrear = void 0;
const express_validator_1 = require("express-validator");
exports.datosPuestoCrear = [
    (0, express_validator_1.body)("CodParqueadero", "Debe ser un numero").isInt(),
    (0, express_validator_1.body)("CodTipoVehiculo", "Debe ser un numero").isInt(),
    (0, express_validator_1.body)("detallePuesto", "No puede estar vacio").isLength({ min: 5 })
];
exports.datosPuestoEliminar = [
    (0, express_validator_1.param)("codPuesto", "Debe ser un numero").isInt(),
    (0, express_validator_1.param)("codPuesto", "Maximo 5 caracteres").isLength({ max: 5 })
];
exports.datosPuestoActualizar = [
    (0, express_validator_1.body)("codPuesto", "Codigo Requerido").not().isEmpty(),
    (0, express_validator_1.body)("codPuesto", "Codigo debe ser numerico").isInt(),
    (0, express_validator_1.body)("codPuesto", "Codigo Requerido").trim().not().isEmpty(),
    (0, express_validator_1.body)("CodParqueadero", "Codigo Requerido").not().isEmpty(),
    (0, express_validator_1.body)("CodParqueadero", " Codigo Debe ser  numerico").isInt(),
    (0, express_validator_1.body)("CodParqueadero", "Puesto Requerido").trim().not().isEmpty(),
    (0, express_validator_1.body)("CodTipoVehiculo", "Codigo Requerido").not().isEmpty(),
    (0, express_validator_1.body)("CodTipoVehiculo", "Codigo debe ser numerico").isInt(),
    (0, express_validator_1.body)("CodTipoVehiculo", "Codigo Requerido").trim().not().isEmpty(),
    (0, express_validator_1.body)("detallePuesto", "No puede estar vacio").not().isEmpty(),
    (0, express_validator_1.body)("detallePuesto", "Debe tener minimo 5 caracteres").isLength({ min: 5 }),
];
