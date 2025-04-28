"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosvalidar = void 0;
const express_validator_1 = require("express-validator");
exports.datosvalidar = [
    (0, express_validator_1.body)("correoAcceso", "No puede estar vacio").trim().not().isEmpty(),
    (0, express_validator_1.body)("correoAcceso", "debe tener minimo 5 caracteres").isLength({ min: 5 }),
    (0, express_validator_1.body)("claveAcceso", "No puede estar vacio").trim().not().isEmpty(),
    (0, express_validator_1.body)("claveAcceso", "debe tener minimo 5 caracteres").isLength({ min: 5 })
];
