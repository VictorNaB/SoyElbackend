"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rol {
    constructor(cod, nom) {
        this._codRol = cod;
        this._nombrerol = nom;
    }
    get codRol() {
        return this._codRol;
    }
    get nombreRol() {
        return this._nombrerol;
    }
    set codRol(cod) {
        this._codRol = cod;
    }
    set nombreRol(nom) {
        this._nombrerol = nom;
    }
}
exports.default = Rol;
