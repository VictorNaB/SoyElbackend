
class Accesos {
    private _codUsuario: number;
    private _correo: string;
    private _clave: string;
    private _uuid: string;
    
    constructor(cod: number, correo: string, clave: string, uuid: string) {
      this._codUsuario = cod;
      this._correo = correo;
      this._clave = clave;
      this._uuid = uuid;
    }
  
    public get codUsuario(): number {
      return this._codUsuario;
    }
    
    public get correo(): string {
      return this._correo;
    }
  
    public set codUsuario(cod: number) {
      this._codUsuario = cod;
    }
  
    public set correo(correo: string) {
      this._correo = correo;
    }
  
    public set clave(clave: string) {
      this._clave = clave;
    }
  
    public set uuid(uuid: string) {
      this._uuid = uuid;
    }
  
    public get clave(): string {
      return this._clave;
    }
    
    public get uuid(): string {
      return this._uuid;
    }
  }
  
  export default Accesos;
  