"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Puesto {
    constructor(cod, codp, cot, det) {
        this.cod_puesto = cod;
        this.cod_parqueadero = codp;
        this.cod_tipo_vehiculo = cot;
        this.detalle_puesto = det;
    }
    get CodTipoVehiculo() {
        return this.cod_tipo_vehiculo;
    }
    set CodTipoVehiculo(cot) {
        this.cod_tipo_vehiculo = cot;
    }
    get codPuesto() {
        return this.cod_puesto;
    }
    set codPuesto(cod) {
        this.cod_puesto = cod;
    }
    get CodParqueadero() {
        return this.cod_parqueadero;
    }
    set CodParqueadero(codp) {
        this.cod_parqueadero = codp;
    }
    get detallePuesto() {
        return this.detalle_puesto;
    }
    set detallePuesto(det) {
        this.detalle_puesto = det;
    }
}
exports.default = Puesto;
