class ServicioOtro {
  private _codServicioOtro: number;
  private _codParqueadero: number;
  private _codVehiculo: number;
  private _fechaPagoServicioOtro: Date;
  private _fechaInicioServicioOtro: Date;
  private _fechaFinServicioOtro: Date;
  private _valorServicioOtro: number;

  constructor(
    codServicioOtro: number,
    codParqueadero: number,
    codVehiculo: number,
    fechaPagoServicioOtro: Date,
    fechaInicioServicioOtro: Date,
    fechaFinServicioOtro: Date,
    valorServicioOtro: number
  ) {
    this._codServicioOtro = codServicioOtro;
    this._codParqueadero = codParqueadero;
    this._codVehiculo = codVehiculo;
    this._fechaPagoServicioOtro = fechaPagoServicioOtro;
    this._fechaInicioServicioOtro = fechaInicioServicioOtro;
    this._fechaFinServicioOtro = fechaFinServicioOtro;
    this._valorServicioOtro = valorServicioOtro;
  }

  public get codServicioOtro(): number {
    return this._codServicioOtro;
  }
  public get codParqueadero(): number {
    return this._codParqueadero;
  }
  public get codVehiculo(): number {
    return this._codVehiculo;
  }
  public get fechaPagoServicioOtro(): Date {
    return this._fechaPagoServicioOtro;
  }
  public get fechaInicioServicioOtro(): Date {
    return this._fechaInicioServicioOtro;
  }
  public get fechaFinServicioOtro(): Date {
    return this._fechaFinServicioOtro;
  }
  public get valorServicioOtro(): number {
    return this._valorServicioOtro;
  }
  public set codServicioOtro(codServicioOtro: number) {
    this._codServicioOtro = codServicioOtro;
  }
  public set codParqueadero(codParqueadero: number) {
    this._codParqueadero = codParqueadero;
  }
  public set codVehiculo(codVehiculo: number) {
    this._codVehiculo = codVehiculo;
  }
  public set fechaPagoServicioOtro(fechaPagoServicioOtro: Date) {
    this._fechaPagoServicioOtro = fechaPagoServicioOtro;
  }
  public set fechaInicioServicioOtro(fechaInicioServicioOtro: Date) {
    this._fechaInicioServicioOtro = fechaInicioServicioOtro;
  }
  public set fechaFinServicioOtro(fechaFinServicioOtro: Date) {
    this._fechaFinServicioOtro = fechaFinServicioOtro;
  }
  public set valorServicioOtro(valorServicioOtro: number) {
    this._valorServicioOtro = valorServicioOtro;
  }
}
export default ServicioOtro;
