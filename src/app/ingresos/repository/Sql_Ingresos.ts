export const Sql_ingresos = {
    REGISTER_LOGIN: `
    INSERT INTO ingresos (cod_usuario, fecha_ingreso, hora_ingreso)
    VALUES ($1, CURRENT_DATE, CURRENT_TIME)
    RETURNING cod_ingreso AS "codIngreso", 
              fecha_ingreso AS "fechaIngreso", 
              hora_ingreso AS "horaIngreso";
  `
}