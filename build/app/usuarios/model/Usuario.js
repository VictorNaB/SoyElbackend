"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Usuario {
    constructor(codUsuario, codRol, documentoUsuario, nombresUsuario, apellidosUsuario, generoUsuario, fechaNacimientoUsuario, telefonoUsuario) {
        this._codUsuario = codUsuario;
        this._codRol = codRol;
        this._documentoUsuario = documentoUsuario;
        this._nombresUsuario = nombresUsuario;
        this._apellidosUsuario = apellidosUsuario;
        this._generoUsuario = generoUsuario;
        this._fechaNacimientoUsuario = fechaNacimientoUsuario;
        this._telefonoUsuario = telefonoUsuario;
    }
    get codUsuario() {
        return this._codUsuario;
    }
    get codRol() {
        return this._codRol;
    }
    get documentoUsuario() {
        return this._documentoUsuario;
    }
    get nombresUsuario() {
        return this._nombresUsuario;
    }
    get apellidosUsuario() {
        return this._apellidosUsuario;
    }
    get generoUsuario() {
        return this._generoUsuario;
    }
    get fechaNacimientoUsuario() {
        return this._fechaNacimientoUsuario;
    }
    get telefonoUsuario() {
        return this._telefonoUsuario;
    }
}
exports.default = Usuario;
