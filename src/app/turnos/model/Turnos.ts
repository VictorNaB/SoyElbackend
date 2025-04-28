class Turno{
    private cod_turno:number;
    private cod_parqueadero:number;;
    private descripcion_turno: String;
    private fecha_turno: String;
    private hora_inicio: String;
    private hora_fin: String;

    constructor(cod: number,codp:number,det: string,fein: String,horai: String,horaf: String){
        this.cod_turno=cod;
        this.cod_parqueadero=codp;
        this.descripcion_turno=det;
        this.fecha_turno=fein;
        this.hora_inicio=horai;
        this.hora_fin=horaf;
    }


    public get CodTurno():number{
        return this.cod_turno;
    }
    public set CodTurno(cod:number){
        this.cod_turno=cod;
    }

    public get CodParqueadero():number{
        return this.cod_parqueadero
    }
    public set CodParqueadero(codp:number){
        this.cod_parqueadero=codp;
    }

    public get DescripcionTurno():String{
        return this.descripcion_turno;
    }

    public set DescripcionTurno(det:String){
        this.descripcion_turno=det;
    }

    public get FechaTurno():String{
        return this.fecha_turno;
    }

    public set FechaTurno(fein:String){
        this.fecha_turno=fein;
    }

    public get HoraInicio():String{
        return this.hora_inicio
    }

    public set HoraInicio(horai:String){
        this.hora_inicio=horai;
    }

    public get HoraFin():String{
        return this.hora_fin
    }

    public set HoraFin(horaf:String){
        this.hora_fin=horaf;
    }


}

export default Turno;