export const sql_rel_turno_usuario ={
    FIND_BY_TURNO:"SELECT cod_turno \
    FROM rel_turno_usuario WHERE cod_turno=$1",
    

    FIND_ALL:"SELECT * FROM rel_turno_usuario",
    
    HOW_MANY: "SELECT COUNT(cod_turnousuario) as cantidad FROM rel_turno_usuario \
      WHERE cod_turno = $1",

    HOW_MANY2: "SELECT COUNT(cod_turnousuario) as cantidad FROM rel_turno_usuario \
      WHERE cod_turnousuario = $1",
      

    ADD: "INSERT INTO rel_turno_usuario(cod_turno, cod_usuario) \
      VALUES ($1, $2) RETURNING cod_turnousuario",
      
    DELETE:
      "DELETE FROM rel_turno_usuario WHERE cod_turnousuario = $1 RETURNING cod_turnousuario",
  
    UPDATE:
      "UPDATE rel_turno_usuario SET cod_turno = $2, cod_usuario = $3 WHERE cod_turnousuario = $1 RETURNING cod_turnousuario",




}