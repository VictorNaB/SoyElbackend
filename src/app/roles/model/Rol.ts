
class Rol {
  private _codRol: number;
  private _nombrerol: string;

  constructor(cod: number, nom: string) {
    this._codRol = cod;
    this._nombrerol = nom;
  }

  public get codRol(): number {
    return this._codRol;
  }
  
  public get nombreRol(): string {
    return this._nombrerol;
  }

  public set codRol(cod: number) {
    this._codRol = cod;
  }

  public set nombreRol(nom: string) {
    this._nombrerol = nom;
  }
}

export default Rol;
