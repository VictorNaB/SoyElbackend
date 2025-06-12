export const SQL_VEHICULO = {
  FIND_ALL:
    "SELECT v.cod_vehiculo, v.cod_tipo_vehiculo, v.cod_usuario, v.placa_vehiculo \
        FROM vehiculos v ORDER BY v.cod_vehiculo",

  FIND_BY_ID:
    "SELECT cod_vehiculo, cod_tipo_vehiculo, cod_usuario, placa_vehiculo \
        FROM vehiculos  WHERE cod_vehiculo = $1",


  FINDBY_USUARIO:'SELECT cod_usuario from usuarios WHERE cod_usuario = $1',

  FINDBY_TIPO_VEHICULO:'SELECT cod_tipo_vehiculo FROM tipos_vehiculos WHERE cod_tipo_vehiculo = $1',

  FIND_BY_SERVICIOSDIARIOS:'SELECT cod_vehiculo FROM servicios_diarios WHERE cod_vehiculo = $1',
  FIND_BY_VEHICULO:'SELECT COUNT(*) as cantidad FROM vehiculos WHERE cod_vehiculo = $1',
  FIND_BY_PLACA:
    "SELECT v.cod_vehiculo, v.cod_tipo_vehiculo, v.cod_usuario, v.placa_vehiculo \
        FROM vehiculos v WHERE v.placa_vehiculo = $1",

  FINDBY_PLACAS2:'SELECT COUNT(v.cod_vehiculo) as cantidad FROM vehiculos v \
        WHERE v.placa_vehiculo = $1 AND v.cod_vehiculo != $2',
  FIND_BY_USUARIO:
    "SELECT v.cod_vehiculo, v.cod_tipo_vehiculo, v.cod_usuario, v.placa_vehiculo \
        FROM vehiculos v WHERE v.cod_usuario = $1",

  FIND_BY_TIPO:
    "SELECT v.cod_vehiculo, v.cod_tipo_vehiculo, v.cod_usuario, v.placa_vehiculo \
        FROM vehiculos v WHERE v.cod_tipo_vehiculo = $1",

  CHECK_PLACA:
    "SELECT COUNT(v.cod_vehiculo) as cantidad FROM vehiculos v \
        WHERE v.placa_vehiculo = $1",

  ADD: "INSERT INTO vehiculos(cod_tipo_vehiculo, cod_usuario, placa_vehiculo) \
        VALUES ($1, $2, $3) RETURNING cod_vehiculo",

  DELETE: "DELETE FROM vehiculos WHERE cod_vehiculo = $1",

  UPDATE:
    "UPDATE vehiculos SET cod_tipo_vehiculo = $1, cod_usuario = $2, \
        placa_vehiculo = $3 WHERE cod_vehiculo = $4",
  };