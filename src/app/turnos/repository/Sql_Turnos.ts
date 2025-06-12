export const sql_Turnos={

    FIND_ALL:"SELECT * FROM turnos ORDER BY cod_turno",

    HOW_MANY:"SELECT COUNT(cod_turno)AS cantidad FROM turnos\
    WHERE cod_turno=$1",

    FIND_BY:
    "SELECT cod_turno,cod_parqueadero, descripcion_turno,\
    fecha_turno,hora_inicio_turno,hora_fin_turno FROM turnos WHERE cod_turno=$1",

    ADD:"INSERT INTO turnos(cod_parqueadero,descripcion_turno,fecha_turno,\
    hora_inicio_turno,hora_fin_turno) VALUES($1,$2,$3,$4,$5)\
    returning cod_turno",

    DELETE:"DELETE FROM turnos WHERE cod_turno=$1",

    UPDATE:"UPDATE turnos SET cod_parqueadero=$2,\
    descripcion_turno=$3,\
    fecha_turno=$4,hora_inicio_turno=$5,\
    hora_fin_turno=$6\
    WHERE cod_turno=$1"


}