class Rel_rol_funcionalidad {
    private _cod_rol: number;
    private _cod_funcionalidad: number;

    constructor(cod_rol: number, cod_funcionalidad: number) {
        this._cod_rol = cod_rol;
        this._cod_funcionalidad = cod_funcionalidad;
    }

    public get cod_rol() {
        return this._cod_rol;
    }

    public set cod_rol(cod_rol: number) {
        this._cod_rol = cod_rol;
    }

    public get cod_funcionalidad() {
        return this._cod_funcionalidad;
    }

    public set cod_funcionalidad(cod_funcionalidad: number) {
        this._cod_funcionalidad = cod_funcionalidad;
    }
}
export default Rel_rol_funcionalidad;