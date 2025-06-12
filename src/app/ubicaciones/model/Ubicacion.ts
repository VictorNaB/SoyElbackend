class Ubicacion {
    private _codUbicacion: number;
    private _codPadreUbicacion: number;
    private _codExternoUbicacion: string;
    private _nombreUbicacion: string;

    constructor(codUbicacion: number, codPadreUbicacion: number, codExternoUbicacion: string, nombreUbicacion: string) {
        this._codUbicacion = codUbicacion;
        this._codPadreUbicacion = codPadreUbicacion;
        this._codExternoUbicacion = codExternoUbicacion;
        this._nombreUbicacion = nombreUbicacion;
    }

    get codUbicacion(): number {
        return this._codUbicacion;
    }

    set codUbicacion(value: number) {
        this._codUbicacion = value;
    }

    get codPadreUbicacion(): number {
        return this._codPadreUbicacion;
    }

    set codPadreUbicacion(value: number) {
        this._codPadreUbicacion = value;
    }

    get codExternoUbicacion(): string {
        return this._codExternoUbicacion;
    }

    set codExternoUbicacion(value: string) {
        this._codExternoUbicacion = value;
    }

    get nombreUbicacion(): string {
        return this._nombreUbicacion;
    }

    set nombreUbicacion(value: string) {
        this._nombreUbicacion = value;
    }
}

export default Ubicacion;