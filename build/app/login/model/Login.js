"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Login {
    constructor(correo, clave) {
        this._correoAcceso = correo;
        this._claveAcceso = clave;
    }
    get correoAcceso() {
        return this._correoAcceso;
    }
    set correoAcceso(value) {
        this._correoAcceso = value;
    }
    get claveAcceso() {
        return this._claveAcceso;
    }
    set claveAcceso(clave) {
        this._claveAcceso = clave;
    }
}
exports.default = Login;
