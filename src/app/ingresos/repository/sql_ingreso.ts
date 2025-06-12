export const SQL_INGRESO = {
  ADD: "INSERT INTO ingresos (cod_usuario, fecha_ingreso, hora_ingreso) \
            VALUES ($1, $2, $3) RETURNING cod_ingreso",
  HOW_MANY:
    "SELECT COUNT(*) as cantidad\
                FROM ingresos \
                WHERE fecha_ingreso = $1 AND hora_ingreso = $2;",
  FIND_ALL:
    "SELECT i.cod_ingreso, i.cod_usuario,\
                i.fecha_ingreso,i.hora_ingreso\
                FROM ingresos as i",
  UPDATE:
    "UPDATE ingresos SET cod_usuario = $1, fecha_ingreso = $2, \
      hora_ingreso = $3 \
   WHERE \
      cod_ingreso = $4",
  DELETE: "DELETE FROM ingresos WHERE cod_ingreso = $1",
  REGISTER_LOGIN: `
    INSERT INTO ingresos (cod_usuario, fecha_ingreso, hora_ingreso)
    VALUES ($1, CURRENT_DATE, CURRENT_TIME)
    RETURNING cod_ingreso AS "codIngreso", 
              fecha_ingreso AS "fechaIngreso", 
              hora_ingreso AS "horaIngreso";
  `,
};
