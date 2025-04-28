"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosRolActualizar = exports.datosRolBorrar = exports.datosRolCrear = void 0;
const express_validator_1 = require("express-validator");
exports.datosRolCrear = [
    (0, express_validator_1.body)("nombreRol", "Rol requerido").not().isEmpty(),
    (0, express_validator_1.body)("nombreRol", "Minimo 5 caracteres").isLength({ min: 5 }),
];
exports.datosRolBorrar = [
    (0, express_validator_1.param)("codRol", "Debe ser un numero").isInt(),
    (0, express_validator_1.param)("codRol", "maximo 6 caracteres").isLength({ max: 5 })
];
exports.datosRolActualizar = [
    (0, express_validator_1.body)("codRol", "Codigo Requerido").not().isEmpty(),
    (0, express_validator_1.body)("codRol", "Codigo debe ser numerico").isInt(),
    (0, express_validator_1.body)("codRol", "Rol Requerido").trim().not().isEmpty(),
    (0, express_validator_1.body)("codRol", "Minimo 5 caracteres").not().isLength({ min: 5 }),
];
