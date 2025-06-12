export const Sql_ServiciosDiarios={
    FIND_ALL:"SELECT cod_servicio_diario, cod_parqueadero, cod_vehiculo,cod_puesto,\
    fecha_inicio_servicio_diario,fecha_fin_servicio_diario,\
    valor_servicio_diario FROM servicios_diarios ORDER BY cod_servicio_diario",

    FIND_BY:"SELECT cod_servicio_diario, cod_parqueadero, cod_vehiculo,cod_puesto,\
    fecha_inicio_servicio_diario, fecha_fin_servicio_diario,\
    valor_servicio_diario FROM servicios_diarios WHERE cod_servicio_diario=$1",

    FIND_BY_PUESTO:"SELECT cod_puesto \
    FROM servicios_diarios WHERE cod_puesto=$1",
<<<<<<< HEAD
=======

    FIND_BY_PUESTO2:'SELECT COUNT(*) as cantidad FROM puestos WHERE cod_puesto = $1 AND cod_parqueadero = $2',

    FIND_BY_VEHICULO:'SELECT COUNT(*) as cantidad FROM vehiculos WHERE cod_vehiculo = $1',

    FIND_BY_PARQUEADERO:'SELECT COUNT(*) as cantidad FROM parqueaderos WHERE cod_parqueadero = $1',
>>>>>>> 62f9d91 (Cambios realizados)
    
    HOW_MANY:"SELECT COUNT(cod_servicio_diario) AS cantidad from servicios_diarios \
    WHERE cod_servicio_diario= $1",

<<<<<<< HEAD
=======


>>>>>>> 62f9d91 (Cambios realizados)
    ADD:"INSERT INTO servicios_diarios(cod_parqueadero, cod_vehiculo,cod_puesto,\
    fecha_inicio_servicio_diario,fecha_fin_servicio_diario,\
    valor_servicio_diario ) VALUES($1,$2,$3,$4,$5,$6)\
    returning cod_servicio_diario",

    DELETE:"DELETE FROM servicios_diarios WHERE cod_servicio_diario=$1",

    UPDATE:"UPDATE servicios_diarios SET cod_parqueadero=$2,\
    cod_vehiculo=$3,cod_puesto=$4,\
    fecha_inicio_servicio_diario=$5,fecha_fin_servicio_diario=$6,\
    valor_servicio_diario=$7\
    WHERE cod_servicio_diario=$1"
<<<<<<< HEAD
    
=======
    
>>>>>>> 62f9d91 (Cambios realizados)
}