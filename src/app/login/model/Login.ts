class Login {
    private _correoAcceso: string;
    private _claveAcceso: string;
    
  
    constructor(correo: string, clave: string, ) {
      this._correoAcceso = correo;
      this._claveAcceso = clave;
      
    }
  

    public get correoAcceso(): string {
      return this._correoAcceso;
    }
  
    public set correoAcceso(value: string) {
      this._correoAcceso = value;
    }
  
    public get claveAcceso(): string {
      return this._claveAcceso;
    }
  
    public set claveAcceso(clave: string) {
      this._claveAcceso = clave;
    }
  }
  
  export default Login;