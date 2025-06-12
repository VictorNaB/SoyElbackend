class IngresoServicioOtro
{
    private _codIngresoServicioOtro:number;
    private _codServicioOtro: number;
    private _codPuesto: number;
    private _fechaIngresoServicioOtro:Date;
    private _fechaSalidaServicioOtro:Date;

    constructor(codIngresoServicioOtro:number,codServicioOtro:number,codPuesto:number,fechaIngresoServicioOtro:Date,fechaSalidaServicioOtro:Date)
    {
        this._codIngresoServicioOtro = codIngresoServicioOtro;
        this._codServicioOtro = codServicioOtro;
        this._codPuesto = codPuesto;
        this._fechaIngresoServicioOtro = fechaIngresoServicioOtro;
        this._fechaSalidaServicioOtro = fechaSalidaServicioOtro;
    }

    public get codIngresoServicioOtro():number
    {
        return this._codIngresoServicioOtro;
    }
    public get codServicioOtro():number
    {
        return this._codServicioOtro;
    }
    public get codPuesto():number
    {
        return this._codPuesto;
    }
    public get fechaIngresoServicioOtro():Date{
        return this._fechaIngresoServicioOtro;
    }
    public get fechaSalidaServicioOtro():Date{
        return this._fechaSalidaServicioOtro;
    }

    public set codIngresoServicioOtro(codIngresoServicioOtro:number)
    {
        this._codIngresoServicioOtro=codIngresoServicioOtro;
    }
    public set codServicioOtro(codServicioOtro:number)
    {
        this._codServicioOtro=codServicioOtro;
    }
    public set codPuesto(codPuesto:number)
    {
        this._codPuesto = codPuesto;
    }

    public set fechaIngresoServicioOtro(fechaIngresoServicioOtro:Date)
    {
        this._fechaIngresoServicioOtro = fechaIngresoServicioOtro;
    }
    public set fechaSalidaServicioOtro(fechaSalidaServicioOtro:Date)
    {
        this._fechaSalidaServicioOtro = fechaSalidaServicioOtro;
    }
    
}
export default IngresoServicioOtro;