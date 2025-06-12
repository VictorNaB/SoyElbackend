class Vehiculo {
    private _codVehiculo: number;
    private _codTipoVehiculo: number;
    private _codUsuario: number;
    private _placaVehiculo: string;
  
    constructor(codVeh: number, codTipo: number, codUsu: number, placa: string) {
      this._codVehiculo = codVeh;
      this._codTipoVehiculo = codTipo;
      this._codUsuario = codUsu;
      this._placaVehiculo = placa;
    }
  
    public get codVehiculo(): number {
      return this._codVehiculo;
    }
  
    public get codTipoVehiculo(): number {
      return this._codTipoVehiculo;
    }
  
    public get codUsuario(): number {
      return this._codUsuario;
    }
  
    public get placaVehiculo(): string {
      return this._placaVehiculo;
    }
  
    public set codVehiculo(value: number) {
      this._codVehiculo = value;
    }
  
    public set codTipoVehiculo(value: number) {
      this._codTipoVehiculo = value;
    }
  
    public set codUsuario(value: number) {
      this._codUsuario = value;
    }
  
    public set placaVehiculo(value: string) {
      this._placaVehiculo = value;
    }
  }
  
  export default Vehiculo;