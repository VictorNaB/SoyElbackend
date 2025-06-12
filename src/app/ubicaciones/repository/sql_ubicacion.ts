export const SQL_UBICACION = {
    FIND_ALL: "SELECT u.cod_ubicacion, u.cod_padre_ubicacion, u.cod_externo_ubicacion, u.nombre_ubicacion \
    FROM ubicaciones u \
    ORDER BY u.cod_ubicacion",

    FIND_BY_ID: "SELECT u.cod_ubicacion, u.cod_padre_ubicacion, u.cod_externo_ubicacion, u.nombre_ubicacion \
    FROM ubicaciones u \
    WHERE cod_ubicacion = $1",

    HOW_MANY: "SELECT COUNT(u.cod_ubicacion) as Cantidad \
    FROM ubicaciones u \
    WHERE u.nombre_ubicacion = $1",

    ADD: "INSERT INTO ubicaciones (cod_padre_ubicacion, cod_externo_ubicacion, nombre_ubicacion) \
    VALUES ($1, $2, $3) RETURNING cod_ubicacion, cod_padre_ubicacion, cod_externo_ubicacion, nombre_ubicacion",

    DELETE: "DELETE FROM ubicaciones \
    WHERE cod_ubicacion = $1",

    UPDATE: "UPDATE ubicaciones \
    SET cod_padre_ubicacion = $1, cod_externo_ubicacion = $2, nombre_ubicacion = $3 \
    WHERE cod_ubicacion = $4",

    COUNT_PARQUEADEROS_BY_UBICACION_ID: "SELECT COUNT(p.cod_parqueadero) AS cantidad_parqueaderos_asignados \
    FROM parqueaderos as p\
    WHERE p.cod_ubicacion = $1",

    COUNT_UBICACIONES_HIJAS: "SELECT count(u.cod_ubicacion) as cantidad_ubicaciones_hijas\
    FROM ubicaciones as u\
    where u.cod_padre_ubicacion = $1",

    HOW_MANY_BY_NAME_AND_DIFFERENT_ID: "SELECT COUNT(u.cod_ubicacion) as cantidad \
    FROM ubicaciones u \
    WHERE u.nombre_ubicacion = $1 AND u.cod_ubicacion != $2"
};