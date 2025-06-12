
<<<<<<< HEAD
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
=======
class Relacion_Turno_Usuario{

    private Cod_turnousuario:number;
    private Cod_turno:number;
    private Cod_usuario:number;

    constructor(cod_turnousuario: number,cod_turno:number,cod_usuario:number){
        this.Cod_turnousuario=cod_turnousuario;
        this.Cod_turno=cod_turno;
        this.Cod_usuario=cod_usuario;
    }

    public get CodTurnoUsuario():number{
        return this.Cod_turnousuario;
    }

    public set CodTurnoUsuario(cod_turnousuario:number){
        this.Cod_turnousuario=cod_turnousuario;
    }

    public get CodTurno():number{
        return this.Cod_turno;
    }

    public set CodTurno(cod_turno:number){
        this.Cod_turno=cod_turno;
    }

    public get CodUsuario():number{
        return this.Cod_usuario;
    }

    public set CodUsuario(cod_usuario:number){
        this.Cod_usuario=cod_usuario;
    }

    

}

export default Relacion_Turno_Usuario;
>>>>>>> 62f9d91 (Cambios realizados)
