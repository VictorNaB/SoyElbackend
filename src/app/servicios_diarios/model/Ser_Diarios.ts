
class Ser_Diarios{
    private cod_servicio_diario:number; 
    private cod_parqueadero:number; 
    private cod_vehiculo:number;
    private cod_puesto:number;
    private fecha_inicio_servicio_diario:Date;
    private fecha_fin_servicio_diario:Date;
    private valor_servicio_diario:number;

    constructor(cod:number,codp:number,codV:number,codPu:number,fechaini:Date, fechafin:Date,valo:number){
        this.cod_servicio_diario=cod;
        this.cod_parqueadero=codp;
        this.cod_vehiculo=codV;
        this.cod_puesto=codPu;
        this.fecha_inicio_servicio_diario=fechaini;
        this.fecha_fin_servicio_diario=fechafin;
        this.valor_servicio_diario=valo;

    }

    public get CodServicioDiarios():number{
        return this.cod_servicio_diario;
    }
    public set CodServicioDiarios(cod:number){
        this.cod_servicio_diario=cod;
    }

    public get CodParqueadero():number{
        return this.cod_parqueadero;
    }

    public set CodParqueadero(codp:number){
        this.cod_parqueadero=codp;
    }

    public get CodVehiculo():number{
        return this.cod_vehiculo;
    }

    public set CodVehiculo(codV:number){
        this.cod_vehiculo=codV;
    }
    public get CodPuesto():number{
        return this.cod_puesto;
    }

    public set CodPuesto(codPu:number){
        this.cod_puesto=codPu;
    }

    public get FechaInicio():Date{
        return this.fecha_inicio_servicio_diario;
    }

    public set FechaInicio(fechaini:Date){
        this.fecha_inicio_servicio_diario=fechaini;
    }

    public get FechaFin():Date{
        return this.fecha_fin_servicio_diario;
    }

    public set FechaFin(fechafin:Date){
        this.fecha_fin_servicio_diario=fechafin;
    }

    public get ValorDiario():number{
        return this.valor_servicio_diario;
    }

    public set ValorDiario(valo:number){
        this.valor_servicio_diario=valo;
    }
}

export default Ser_Diarios;