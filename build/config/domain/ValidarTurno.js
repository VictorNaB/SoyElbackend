"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosTurnosActualizar = exports.datoTurnosBorrar = exports.datosTurnoCrear = void 0;
const express_validator_1 = require("express-validator");
exports.datosTurnoCrear = [
    (0, express_validator_1.body)("CodParqueadero", "Debe ser un numero").isInt().notEmpty(),
    (0, express_validator_1.body)("DescripcionTurno", "Descripcion Requerida").notEmpty(),
    (0, express_validator_1.body)("FechaTurno", "Debe ser una fecha valida").notEmpty(),
    (0, express_validator_1.body)("HoraInicio", "La Hora no puede estar vacia").notEmpty(),
    (0, express_validator_1.body)("HoraFin", "Debe ser una Hora valida").notEmpty(),
];
exports.datoTurnosBorrar = [
    (0, express_validator_1.param)("CodTurno", "Debe ser un numero").isInt(),
    (0, express_validator_1.param)("CodTurno", "maximo 6 caracteres").isLength({ max: 5 })
];
exports.datosTurnosActualizar = [
    (0, express_validator_1.body)("CodTurno", "Debe ser un numero").isInt(),
    (0, express_validator_1.body)("CodTurno", "maximo 6 caracteres").isLength({ max: 5 }),
    (0, express_validator_1.body)("CodParqueadero", "Debe ser un numero").isInt().notEmpty(),
    (0, express_validator_1.body)("DescripcionTurno", "Descripcion Requerida").trim().not().isEmpty(),
    (0, express_validator_1.body)("FechaTurno", "Debe ser una fecha valida").notEmpty(),
    (0, express_validator_1.body)("HoraInicio", "Hora inicio no puede estar vacia").notEmpty(),
    (0, express_validator_1.body)("HoraFin", "Hora fin no puede estar vacia").notEmpty(),
];
