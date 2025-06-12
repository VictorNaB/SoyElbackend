class TarifaDiaria {
    private _codTipoVehiculo: number;
    private _codParqueadero: number;
    private _valorTarifaDiaria: number;

    constructor(codParqueadero: number, codTpVh: number, valor: number) {
        this._codParqueadero = codParqueadero;
        this._codTipoVehiculo = codTpVh;
        this._valorTarifaDiaria = valor;
    }

    public get codTipoVehiculo(): number {
        return this._codTipoVehiculo;
    }

    public get codParqueadero(): number {
        return this._codParqueadero;
    }

    public get valorTarifaDiaria(): number {
        return this._valorTarifaDiaria;
    }

    public set codTipoVehiculo(cod: number) {
        this._codTipoVehiculo = cod;
    }

    public set codParqueadero(cod: number) {
        this._codParqueadero = cod;
    }

    public set valorTarifaDiaria(valor: number) {
        this._valorTarifaDiaria = valor;
    }
}

export default TarifaDiaria;