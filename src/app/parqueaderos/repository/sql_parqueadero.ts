export const SQL_PARQUEADERO = {
    FIND_ALL: "SELECT p.cod_parqueadero, p.cod_ubicacion, p.nombre_parqueadero, p.direccion_parqueadero, p.telefono_parqueadero \
    FROM parqueaderos p \
    ORDER BY p.cod_parqueadero",

    FIND_BY_ID: "SELECT p.cod_parqueadero, p.cod_ubicacion, p.nombre_parqueadero, p.direccion_parqueadero, p.telefono_parqueadero \
    FROM parqueaderos p \
    WHERE cod_parqueadero = $1",

    HOW_MANY: "SELECT COUNT(p.cod_parqueadero) as Cantidad \
    FROM parqueaderos p \
    WHERE p.nombre_parqueadero = $1",

    ADD: "INSERT INTO parqueaderos (cod_ubicacion, nombre_parqueadero, direccion_parqueadero, telefono_parqueadero) \
    VALUES ($1, $2, $3, $4) RETURNING cod_parqueadero",

    DELETE: "DELETE FROM parqueaderos \
    WHERE cod_parqueadero = $1",

    UPDATE: "UPDATE parqueaderos \
    SET cod_ubicacion = $1, nombre_parqueadero = $2, direccion_parqueadero = $3, telefono_parqueadero = $4 \
    WHERE cod_parqueadero = $5",

    COUNT_PUESTOS_BY_ID: "SELECT COUNT(pt.cod_puesto) AS total_puestos \
    FROM puestos pt\
    WHERE pt.cod_parqueadero = $1",

    // Nuevas consultas para verificar relaciones
    COUNT_PUESTOS: "SELECT COUNT(*) as cantidad FROM puestos WHERE cod_parqueadero = $1",
    
    COUNT_SERVICIOS_DIARIOS: "SELECT COUNT(*) as cantidad FROM servicios_diarios WHERE cod_parqueadero = $1",
    
    COUNT_SERVICIOS_OTROS: "SELECT COUNT(*) as cantidad FROM servicios_otros WHERE cod_parqueadero = $1",
    
    COUNT_TARIFAS: "SELECT COUNT(*) as cantidad FROM tarifa_diaria WHERE cod_parqueadero = $1",
    
    COUNT_TURNOS: "SELECT COUNT(*) as cantidad FROM turnos WHERE cod_parqueadero = $1"
};