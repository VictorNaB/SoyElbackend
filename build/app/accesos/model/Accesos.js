"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Accesos {
    constructor(cod, correo, clave, uuid) {
        this._codUsuario = cod;
        this._correo = correo;
        this._clave = clave;
        this._uuid = uuid;
    }
    get codUsuario() {
        return this._codUsuario;
    }
    get correo() {
        return this._correo;
    }
    set codUsuario(cod) {
        this._codUsuario = cod;
    }
    set correo(correo) {
        this._correo = correo;
    }
    set clave(clave) {
        this._clave = clave;
    }
    set uuid(uuid) {
        this._uuid = uuid;
    }
    get clave() {
        return this._clave;
    }
    get uuid() {
        return this._uuid;
    }
}
exports.default = Accesos;
