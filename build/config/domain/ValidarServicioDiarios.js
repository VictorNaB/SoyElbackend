"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosServicioDiarioActualizar = exports.datoServiciosdiariosBorrar = exports.datosServiciodiariosCrear = void 0;
const express_validator_1 = require("express-validator");
exports.datosServiciodiariosCrear = [
    (0, express_validator_1.body)("CodParqueadero", "Debe ser un numero").isInt().notEmpty(),
    (0, express_validator_1.body)("CodVehiculo", "Debe ser un numero").isInt(),
    (0, express_validator_1.body)("CodPuesto", "Debe ser un numero").isInt(),
    (0, express_validator_1.body)("FechaInicio", "Debe ser una fecha valida").isISO8601().toDate(),
    (0, express_validator_1.body)("FechaFin", "Debe ser una fecha valida").isISO8601().toDate(),
    (0, express_validator_1.body)("ValorDiario", "Debe ser un numero").isFloat()
];
exports.datoServiciosdiariosBorrar = [
    (0, express_validator_1.param)("CodServicioDiarios", "Debe ser un numero").isInt(),
    (0, express_validator_1.param)("CodServicioDiarios", "maximo 6 caracteres").isLength({ max: 5 })
];
exports.datosServicioDiarioActualizar = [
    (0, express_validator_1.body)("CodServicioDiarios", "Codigo Requerido").isInt().notEmpty(),
    (0, express_validator_1.body)("CodServicioDiarios", "Codigo Requerido").trim().not().isEmpty(),
    (0, express_validator_1.body)("CodParqueadero", "Codigo Requerido").isInt().notEmpty(),
    (0, express_validator_1.body)("CodParqueadero", "Puesto Requerido").trim().not().isEmpty(),
    (0, express_validator_1.body)("CodVehiculo", "Codigo Requerido").isInt().notEmpty(),
    (0, express_validator_1.body)("CodVehiculo", "Codigo Requerido").trim().not().isEmpty(),
    (0, express_validator_1.body)("FechaInicio", "Codigo Requerido").not().isEmpty(),
    (0, express_validator_1.body)("FechaInicio", "Debe ser una fecha valida").isISO8601().toDate(),
    (0, express_validator_1.body)("FechaFin", "Debe ser una fecha valida").isISO8601().toDate(),
    (0, express_validator_1.body)("ValorDiario", "Debe ser un numero").isFloat({ min: 0 }),
    (0, express_validator_1.body)("ValorDiario", "Codigo Requerido").trim().not().isEmpty(),
    (0, express_validator_1.body)("ValorDiario", "Debe tener maximo 5 caracteres").isLength({ max: 5 }),
];
