export const SQL_SERVICIO_OTRO = {
  FIND_ALL:
    "SELECT so.cod_servicio_otro, so.cod_parqueadero, so.cod_vehiculo, so.fecha_pago_servicio_otro, so.fecha_inicio_servicio_otro, so.fecha_fin_servicio_otro, so.valor_servicio_otro\
    FROM servicios_otros so ORDER BY so.cod_servicio_otro",

  FIND_BY_ID:
    "SELECT so.cod_servicio_otro, so.cod_parqueadero, so.cod_vehiculo, so.fecha_pago_servicio_otro, so.fecha_inicio_servicio_otro, so.fecha_fin_servicio_otro, so.valor_servicio_otro\
        FROM servicios_otros so WHERE so.cod_servicio_otro = $1",
  //solo se puede tener una fila por fecha de inicio y fin
  HOW_MANY: "SELECT COUNT(cod_servicio_otro) AS cantidad\
  FROM servicios_otros\
  WHERE fecha_inicio_servicio_otro = $1\
    AND fecha_fin_servicio_otro = $2\
    AND cod_vehiculo = $3",

   

  ADD: "INSERT INTO servicios_otros(cod_parqueadero, cod_vehiculo, fecha_pago_servicio_otro, fecha_inicio_servicio_otro, fecha_fin_servicio_otro, valor_servicio_otro)\
        VALUES ($1, $2, $3, $4, $5, $6)\
        RETURNING cod_servicio_otro",

  DELETE: "DELETE FROM servicios_otros WHERE cod_servicio_otro = $1",

  UPDATE:
    "UPDATE servicios_otros SET  cod_parqueadero = $1, cod_vehiculo = $2, fecha_pago_servicio_otro = $3, fecha_inicio_servicio_otro = $4, fecha_fin_servicio_otro = $5, valor_servicio_otro = $6\
      WHERE cod_servicio_otro = $7\
      "
};
