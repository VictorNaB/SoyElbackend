"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class rel_turno_usuario {
    constructor(CodTuUs, cod_turno, codUsu) {
        this.Cod_Turno_Usuario = CodTuUs;
        this.cod_turno = cod_turno;
        this.cod_usuario = codUsu;
    }
    get CodTurnoUsuario() {
        return this.Cod_Turno_Usuario;
    }
    set CodTurnoUsuario(CodTuUs) {
        this.Cod_Turno_Usuario = CodTuUs;
    }
    get CodTurno() {
        return this.cod_turno;
    }
    set CodTurno(CodTuUs) {
        this.cod_turno = CodTuUs;
    }
    get CodUsuario() {
        return this.cod_usuario;
    }
    set CodUsuario(codUsu) {
        this.cod_usuario = codUsu;
    }
}
exports.default = rel_turno_usuario;
