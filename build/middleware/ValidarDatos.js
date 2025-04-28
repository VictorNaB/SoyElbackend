"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class ValidarDatos {
    ahora(req, res, next) {
        const arregloErrores = (0, express_validator_1.validationResult)(req);
        if (arregloErrores.isEmpty()) {
            next();
        }
        else {
            res.status(400).json({ respuesta: arregloErrores.array() });
        }
    }
}
const validarDatos = new ValidarDatos();
exports.default = validarDatos;
