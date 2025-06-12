export const SQL_INGRESO_SERVIVIO_OTRO = {
  FIND_ALL:
    "SELECT iso.cod_ingreso_servicio_otro, iso.cod_servicio_otro, iso.cod_puesto,\
                iso.fecha_ingreso_servicio_otro,iso.fecha_salida_servicio_otro\
                FROM ingresos_servicios_otros as iso",

  HOW_MANY:
    "SELECT COUNT(iso.cod_ingreso_servicio_otro) AS cantidad \
                FROM ingresos_servicios_otros iso\
                WHERE iso.cod_servicio_otro = $1\
                AND iso.cod_puesto = $2\
                AND iso.fecha_ingreso_servicio_otro = $3\
                AND iso.fecha_salida_servicio_otro = $4",
  ADD: "INSERT INTO ingresos_servicios_otros (cod_servicio_otro, cod_puesto, fecha_ingreso_servicio_otro, fecha_salida_servicio_otro)\
            VALUES ($1, $2, $3, $4)\
            RETURNING cod_ingreso_servicio_otro",

  DELETE:
    "DELETE FROM ingresos_servicios_otros WHERE cod_ingreso_servicio_otro = $1",

  UPDATE:
    "UPDATE ingresos_servicios_otros \
                SET cod_servicio_otro = $2, \
                cod_puesto = $3, \
                fecha_ingreso_servicio_otro = $4, \
                fecha_salida_servicio_otro = $5 \
                WHERE cod_ingreso_servicio_otro = $1",
  GET_BY_ID:
    "SELECT * FROM ingresos_servicios_otros WHERE cod_ingreso_servicio_otro = $1",
};
