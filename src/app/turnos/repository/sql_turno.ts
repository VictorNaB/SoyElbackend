export const SQL_TURNO = {
    FIND_ALL:
      "SELECT t.cod_turno, t.cod_parqueadero, t.descripcion_turno, t.fecha_turno, t.hora_inicio_turno, t.hora_fin_turno \
      FROM turnos t ORDER BY t.cod_turno",
  
    FIND_BY_ID:
      "SELECT cod_turno, cod_parqueadero, descripcion_turno, fecha_turno, hora_inicio_turno, hora_fin_turno \
      FROM turnos WHERE cod_turno = $1",
  
      HOW_MANY: "SELECT COUNT(cod_turno) as cantidad FROM turnos \
      WHERE descripcion_turno = $1",

      HOW_MANY2: "SELECT COUNT(cod_turno) as cantidad FROM turnos \
      WHERE cod_turno = $1",
      

      ADD: "INSERT INTO turnos(cod_parqueadero, descripcion_turno, fecha_turno, hora_inicio_turno, hora_fin_turno) \
      VALUES ($1, $2, $3, $4, $5) RETURNING cod_turno",
      
    DELETE:
      "DELETE FROM turnos WHERE cod_turno = $1 RETURNING cod_turno",
  
    UPDATE:
      "UPDATE turnos SET cod_parqueadero = $2, descripcion_turno = $3, fecha_turno = $4, \
      hora_inicio_turno = $5, hora_fin_turno = $6 WHERE cod_turno = $1"
  };
  