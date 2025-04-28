"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Turno {
    ;
    constructor(cod, codp, det, fein, horai, horaf) {
        this.cod_turno = cod;
        this.cod_parqueadero = codp;
        this.descripcion_turno = det;
        this.fecha_turno = fein;
        this.hora_inicio = horai;
        this.hora_fin = horaf;
    }
    get CodTurno() {
        return this.cod_turno;
    }
    set CodTurno(cod) {
        this.cod_turno = cod;
    }
    get CodParqueadero() {
        return this.cod_parqueadero;
    }
    set CodParqueadero(codp) {
        this.cod_parqueadero = codp;
    }
    get DescripcionTurno() {
        return this.descripcion_turno;
    }
    set DescripcionTurno(det) {
        this.descripcion_turno = det;
    }
    get FechaTurno() {
        return this.fecha_turno;
    }
    set FechaTurno(fein) {
        this.fecha_turno = fein;
    }
    get HoraInicio() {
        return this.hora_inicio;
    }
    set HoraInicio(horai) {
        this.hora_inicio = horai;
    }
    get HoraFin() {
        return this.hora_fin;
    }
    set HoraFin(horaf) {
        this.hora_fin = horaf;
    }
}
exports.default = Turno;
