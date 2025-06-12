class TipoVehiculo {
    private _codTipoVehiculo: number;
    private _claseTipoVehiculo: string;
  
    constructor(cod: number, cla: string) {
      this._codTipoVehiculo = cod;
      this._claseTipoVehiculo = cla;
    }
  
    public get codTipoVehiculo(): number {
      return this._codTipoVehiculo;
    }
  
    public get claseTipoVehiculo(): string {
      return this._claseTipoVehiculo;
    }
  
    public set codTipoVehiculo(cod: number) {
      this._codTipoVehiculo = cod;
    }
  
    public set claseTipoVehiculo(cla: string) {
      this._claseTipoVehiculo = cla;
    }
  }
  
  export default TipoVehiculo;