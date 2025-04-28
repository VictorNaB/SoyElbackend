"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosAccesoActualizar = exports.datoAccesoBorrar = exports.datosAccesoCrear = void 0;
const express_validator_1 = require("express-validator");
exports.datosAccesoCrear = [
    (0, express_validator_1.body)("codUsuario", "Debe ser un numero").isInt().notEmpty(),
    (0, express_validator_1.body)("correo", "Correo Requerido").isEmail().notEmpty(),
    (0, express_validator_1.body)("clave", "Clave Requerida").isLength({ min: 5 }).notEmpty(),
    (0, express_validator_1.body)("uuid", "UUID Requerido").notEmpty(),
];
exports.datoAccesoBorrar = [
    (0, express_validator_1.param)("codUsuario", "Debe ser un numero").isInt(),
    (0, express_validator_1.param)("codUsuario", "maximo 6 caracteres").isLength({ max: 5 })
];
exports.datosAccesoActualizar = [
    (0, express_validator_1.body)("codUsuario", "Codigo Requerido").isInt().notEmpty(),
    (0, express_validator_1.body)("codUsuario", "Codigo Requerido").trim().not().isEmpty(),
    (0, express_validator_1.body)("correo", "Correo Requerido").isEmail().notEmpty(),
    (0, express_validator_1.body)("clave", "Clave Requerida").isLength({ min: 5 }).notEmpty(),
    (0, express_validator_1.body)("uuid", "UUID Requerido").notEmpty(),
];
