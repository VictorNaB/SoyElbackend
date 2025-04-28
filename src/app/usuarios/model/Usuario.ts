class Usuario {
    private _codUsuario: number;
    private _codRol: number;
    private _documentoUsuario: string;
    private _nombresUsuario: string;
    private _apellidosUsuario: string;
    private _generoUsuario: number;
    private _fechaNacimientoUsuario: Date;
    private _telefonoUsuario: string;
  
    constructor(
      codUsuario: number,
      codRol: number,
      documentoUsuario: string,
      nombresUsuario: string,
      apellidosUsuario: string,
      generoUsuario: number,
      fechaNacimientoUsuario: Date,
      telefonoUsuario: string
    ) {
      this._codUsuario = codUsuario;
      this._codRol = codRol;
      this._documentoUsuario = documentoUsuario;
      this._nombresUsuario = nombresUsuario;
      this._apellidosUsuario = apellidosUsuario;
      this._generoUsuario = generoUsuario;
      this._fechaNacimientoUsuario = fechaNacimientoUsuario;
      this._telefonoUsuario = telefonoUsuario;
    }
  
    public get codUsuario(): number {
      return this._codUsuario;
    }
  
    public get codRol(): number {
      return this._codRol;
    }
  
    public get documentoUsuario(): string {
      return this._documentoUsuario;
    }
  
    public get nombresUsuario(): string {
      return this._nombresUsuario;
    }
  
    public get apellidosUsuario(): string {
      return this._apellidosUsuario;
    }
  
    public get generoUsuario(): number {
      return this._generoUsuario;
    }
  
    public get fechaNacimientoUsuario(): Date {
      return this._fechaNacimientoUsuario;
    }
  
    public get telefonoUsuario(): string {
      return this._telefonoUsuario;
    }
  }
  
  export default Usuario;
  