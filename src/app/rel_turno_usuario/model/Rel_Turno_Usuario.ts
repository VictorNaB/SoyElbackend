
class rel_turno_usuario{
    Cod_Turno_Usuario:number;
    cod_turno:number;
    cod_usuario:number;


    constructor(CodTuUs:number, cod_turno:number, codUsu:number){
        this.Cod_Turno_Usuario=CodTuUs;
        this.cod_turno=cod_turno;
        this.cod_usuario=codUsu;
    }


    public get CodTurnoUsuario():number{
        return this.Cod_Turno_Usuario;
    }

    public set CodTurnoUsuario(CodTuUs:number){
        this.Cod_Turno_Usuario=CodTuUs;
    }

    public get CodTurno():number{
        return this.cod_turno;
    }

    public set CodTurno(CodTuUs:number){
        this.cod_turno=CodTuUs;
    }

    public get CodUsuario():number{
        return this.cod_usuario;
    }


    public set CodUsuario(codUsu:number){
        this.cod_usuario=codUsu;
    }

}

export default rel_turno_usuario;