class Puesto{

    private cod_puesto:number;
    private cod_parqueadero:number;
    private cod_tipo_vehiculo: number;
    private detalle_puesto: String;

    constructor(cod: number,codp:number,cot:number,det: string){
        this.cod_puesto=cod;
        this.cod_parqueadero=codp;
        this.cod_tipo_vehiculo=cot;
        this.detalle_puesto=det;
    }


    public get CodTipoVehiculo():number{
        return this.cod_tipo_vehiculo;
    }

    public set CodTipoVehiculo(cot:number){
        this.cod_tipo_vehiculo=cot;
    }
    public get codPuesto(): number{
        return this.cod_puesto;

    }
    public set codPuesto(cod:number){
        this.cod_puesto=cod;
    }
    public get CodParqueadero():number{
        return this.cod_parqueadero;
    }

    public set CodParqueadero(codp:number){
        this.cod_parqueadero=codp;
    }

    public get detallePuesto():String{
        return this.detalle_puesto;

    }

    
    public set detallePuesto(det:String){
        this.detalle_puesto=det;
    }
}

export default Puesto;