class Ingreso{
    private _Cod_ingreso:number;
    private _Cod_usuario:number;
    private _fecha_ingreso:string;
    private _hora_ingreso:string;

    constructor(codIngreso:number, codUsuario:number, fechaIngreso:string, horaIngreso:string){
        this._Cod_ingreso = codIngreso;
        this._Cod_usuario = codUsuario;
        this._fecha_ingreso = fechaIngreso;
        this._hora_ingreso = horaIngreso;
    }
    public get codIngreso():number{
        return this._Cod_ingreso;
    }
    public get codUsuario():number{
        return this._Cod_usuario;
    }
    public get fechaIngreso():string{
        return this._fecha_ingreso;
    }
    public get horaIngreso():string{
        return this._hora_ingreso;
    }
    public set codIngreso(codIngreso:number){
        this._Cod_ingreso = codIngreso;
    }
    public set codUsuario(codUsuario:number){
        this._Cod_usuario = codUsuario;
    }
    public set fechaIngreso(fechaIngreso:string){
        this._fecha_ingreso = fechaIngreso;
    }
    public set horaIngreso(horaIngreso:string){
        this._hora_ingreso = horaIngreso;
    }

}
export default Ingreso;