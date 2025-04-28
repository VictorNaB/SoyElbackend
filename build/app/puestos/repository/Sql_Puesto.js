"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sql_puesto = void 0;
exports.sql_puesto = {
    FIND_ALL: "SELECT cod_puesto,cod_parqueadero, cod_tipo_vehiculo,\
      detalle_puesto FROM puestos ORDER BY cod_puesto ",
    FIND_BY: "SELECT cod_puesto,cod_parqueadero, cod_tipo_vehiculo,\
    detalle_puesto FROM puestos WHERE cod_puesto=$1",
    HOW_MANY: "SELECT COUNT(cod_puesto) AS cantidad FROM puestos \
    WHERE detalle_puesto= $1",
    ADD: "INSERT INTO puestos(cod_parqueadero,cod_tipo_vehiculo,detalle_puesto) VALUES($1,$2,$3) \
  RETURNING cod_puesto",
    DELETE: "DELETE FROM puestos WHERE cod_puesto=$1",
    UPDATE: "UPDATE puestos SET cod_parqueadero=$2,\
  cod_tipo_vehiculo=$3,\
  detalle_puesto=$4\
  WHERE cod_puesto=$1"
};
