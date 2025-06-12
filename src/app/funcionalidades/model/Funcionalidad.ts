class Funcionalidad {
    private _codFuncionalidad: number;
    private _codPadreFuncionalidad: number | null;
    private _nombreFuncionalidad: string;
    private _urlFuncionalidad: string;
  
    constructor(codFuncionalidad: number, codPadreFuncionalidad: number | null, nombreFuncionalidad: string, urlFuncionalidad: string) {
      this._codFuncionalidad = codFuncionalidad;
      this._codPadreFuncionalidad = codPadreFuncionalidad;
      this._nombreFuncionalidad = nombreFuncionalidad;
      this._urlFuncionalidad = urlFuncionalidad;
    }
  
    public get codFuncionalidad(): number {
      return this._codFuncionalidad;
    }
  
    public set codFuncionalidad(codFuncionalidad: number) {
      this._codFuncionalidad = codFuncionalidad;
    }
  
    public get codPadreFuncionalidad(): number | null {
      return this._codPadreFuncionalidad;
    }
  
    public set codPadreFuncionalidad(codPadreFuncionalidad: number | null) {
      this._codPadreFuncionalidad = codPadreFuncionalidad;
    }
  
    public get nombreFuncionalidad(): string {
      return this._nombreFuncionalidad;
    }
  
    public set nombreFuncionalidad(nombreFuncionalidad: string) {
      this._nombreFuncionalidad = nombreFuncionalidad;
    }
  
    public get urlFuncionalidad(): string {
      return this._urlFuncionalidad;
    }
  
    public set urlFuncionalidad(urlFuncionalidad: string) {
      this._urlFuncionalidad = urlFuncionalidad;
    }
  }
  
  export default Funcionalidad;