"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosRelTurnoUsuarioActualizar = exports.datoRelTurnoUsuarioBorrar = exports.datosRelTurnoUsuarioCrear = void 0;
const express_validator_1 = require("express-validator");
exports.datosRelTurnoUsuarioCrear = [
    (0, express_validator_1.body)("CodTurno", "Debe ser un numero").isInt().notEmpty(),
    (0, express_validator_1.body)("CodUsuario", "Debe ser un numero").isInt().notEmpty(),
];
exports.datoRelTurnoUsuarioBorrar = [
    (0, express_validator_1.param)("CodTurnoUsuario", "Debe ser un numero").isInt(),
    (0, express_validator_1.param)("CodTurnoUsuario", "maximo 6 caracteres").isLength({ max: 5 })
];
exports.datosRelTurnoUsuarioActualizar = [
    (0, express_validator_1.body)("CodTurnoUsuario", "Debe ser un numero").isInt(),
    (0, express_validator_1.body)("CodTurnoUsuario", "maximo 6 caracteres").isLength({ max: 5 }),
    (0, express_validator_1.body)("CodTurno", "Debe ser un numero").isInt().notEmpty(),
    (0, express_validator_1.body)("CodUsuario", "Debe ser un numero").isInt().notEmpty(),
];
