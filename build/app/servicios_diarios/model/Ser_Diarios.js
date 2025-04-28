"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ser_Diarios {
    constructor(cod, codp, codV, codPu, fechaini, fechafin, valo) {
        this.cod_servicio_diario = cod;
        this.cod_parqueadero = codp;
        this.cod_vehiculo = codV;
        this.cod_puesto = codPu;
        this.fecha_inicio_servicio_diario = fechaini;
        this.fecha_fin_servicio_diario = fechafin;
        this.valor_servicio_diario = valo;
    }
    get CodServicioDiarios() {
        return this.cod_servicio_diario;
    }
    set CodServicioDiarios(cod) {
        this.cod_servicio_diario = cod;
    }
    get CodParqueadero() {
        return this.cod_parqueadero;
    }
    set CodParqueadero(codp) {
        this.cod_parqueadero = codp;
    }
    get CodVehiculo() {
        return this.cod_vehiculo;
    }
    set CodVehiculo(codV) {
        this.cod_vehiculo = codV;
    }
    get CodPuesto() {
        return this.cod_puesto;
    }
    set CodPuesto(codPu) {
        this.cod_puesto = codPu;
    }
    get FechaInicio() {
        return this.fecha_inicio_servicio_diario;
    }
    set FechaInicio(fechaini) {
        this.fecha_inicio_servicio_diario = fechaini;
    }
    get FechaFin() {
        return this.fecha_fin_servicio_diario;
    }
    set FechaFin(fechafin) {
        this.fecha_fin_servicio_diario = fechafin;
    }
    get ValorDiario() {
        return this.valor_servicio_diario;
    }
    set ValorDiario(valo) {
        this.valor_servicio_diario = valo;
    }
}
exports.default = Ser_Diarios;
