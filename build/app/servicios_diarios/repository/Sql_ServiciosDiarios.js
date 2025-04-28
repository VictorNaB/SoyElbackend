"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sql_ServiciosDiarios = void 0;
exports.Sql_ServiciosDiarios = {
    FIND_ALL: "SELECT cod_servicio_diario, cod_parqueadero, cod_vehiculo,cod_puesto,\
    fecha_inicio_servicio_diario,fecha_fin_servicio_diario,\
    valor_servicio_diario FROM servicios_diarios ORDER BY cod_servicio_diario",
    FIND_BY: "SELECT cod_servicio_diario, cod_parqueadero, cod_vehiculo,cod_puesto,\
    fecha_inicio_servicio_diario, fecha_fin_servicio_diario,\
    valor_servicio_diario FROM servicios_diarios WHERE cod_servicio_diario=$1",
    FIND_BY_PUESTO: "SELECT cod_puesto \
    FROM servicios_diarios WHERE cod_puesto=$1",
    HOW_MANY: "SELECT COUNT(cod_servicio_diario) AS cantidad from servicios_diarios \
    WHERE cod_servicio_diario= $1",
    ADD: "INSERT INTO servicios_diarios(cod_parqueadero, cod_vehiculo,cod_puesto,\
    fecha_inicio_servicio_diario,fecha_fin_servicio_diario,\
    valor_servicio_diario ) VALUES($1,$2,$3,$4,$5,$6)\
    returning cod_servicio_diario",
    DELETE: "DELETE FROM servicios_diarios WHERE cod_servicio_diario=$1",
    UPDATE: "UPDATE servicios_diarios SET cod_parqueadero=$2,\
    cod_vehiculo=$3,cod_puesto=$4,\
    fecha_inicio_servicio_diario=$5,fecha_fin_servicio_diario=$6,\
    valor_servicio_diario=$7\
    WHERE cod_servicio_diario=$1"
};
