import Ubicacion from "../../ubicaciones/model/Ubicacion";

class Parqueadero {

    private _codParqueadero: number;
    private _ubicacion: Ubicacion;
    private _nombreParqueadero: string;
    private _direccionParqueadero: string;
    private _telefonoParqueadero: string;

    constructor(codParqueadero: number, ubicacion: Ubicacion, nombreParqueadero: string, direccionParqueadero: string, telefonoParqueadero: string) {
        this._codParqueadero = codParqueadero;
        this._ubicacion = ubicacion;
        this._nombreParqueadero = nombreParqueadero;
        this._direccionParqueadero = direccionParqueadero;
        this._telefonoParqueadero = telefonoParqueadero;
    }

    public get codParqueadero(): number {
        return this._codParqueadero;
    }

    public set codParqueadero(codParqueadero: number) {
        this._codParqueadero = codParqueadero;
    }

    public get ubicacion(): Ubicacion {
        return this._ubicacion;
    }

    public set ubicacion(ubicacion: Ubicacion) {
        this._ubicacion = ubicacion;
    }

    public get nombreParqueadero(): string {
        return this._nombreParqueadero;
    }

    public set nombreParqueadero(nombreParqueadero: string) {
        this._nombreParqueadero = nombreParqueadero;
    }

    public get direccionParqueadero(): string {
        return this._direccionParqueadero;
    }

    public set direccionParqueadero(direccionParqueadero: string) {
        this._direccionParqueadero = direccionParqueadero;
    }

    public get telefonoParqueadero(): string {
        return this._telefonoParqueadero;
    }

    public set telefonoParqueadero(telefonoParqueadero: string) {
        this._telefonoParqueadero = telefonoParqueadero;
    }
}

export default Parqueadero;