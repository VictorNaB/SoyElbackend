class Turno {
    private _codTurno: number;
    private _codParqueadero: number;
    private _descripcionTurno: string;
    private _fechaTurno: Date;
    private _horaInicioTurno: String;
    private _horaFinTurno: String;
  

    constructor(codTurno: number, codParqueadero: number, descripcionTurno: string, fechaTurno: Date, horaInicioTurno: String, horaFinTurno: String) {
        this._codTurno = codTurno;
        this._codParqueadero = codParqueadero;
        this._descripcionTurno = descripcionTurno;
        this._fechaTurno = fechaTurno;
        this._horaInicioTurno = horaInicioTurno;
        this._horaFinTurno = horaFinTurno;
    }

    public get CodTurno(): number {
        return this._codTurno;
    }

    public set CodTurno(codTurno: number) {
        this._codTurno = codTurno;
    }

    public get CodParqueadero(): number {
        return this._codParqueadero;
    }

    public set CodParqueadero(codParqueadero: number) {
        this._codParqueadero = codParqueadero;
    }

    public get DescripcionTurno(): string {
        return this._descripcionTurno;
    }

    public set DescripcionTurno(descripcionTurno: string) {
        this._descripcionTurno = descripcionTurno;
    }

    public get FechaTurno(): Date {
        return this._fechaTurno;
    }

    public set FechaTurno(fechaTurno: Date) {
        this._fechaTurno = fechaTurno;
    }

    public get HoraInicioTurno(): String {
        return this._horaInicioTurno;
    }

    public set HoraInicioTurno(horaInicioTurno: String) {
        this._horaInicioTurno = horaInicioTurno;
    }

    public get HoraFinTurno(): String {
        return this._horaFinTurno;
    }

    public set HoraFinTurno(horaFinTurno: String) {
        this._horaFinTurno = horaFinTurno;
    }

    


}

export default Turno;