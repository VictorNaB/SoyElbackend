export const sql_roles = {
<<<<<<< HEAD
  FIND_ALL:
    "SELECT r.cod_rol,r.nombre_rol \
    From roles r ORDER BY r.cod_rol",

  FIND_BY_ID:
    "SELECT r.cod_rol, r.nombre_rol \
    FROM roles r WHERE r.cod_rol = $1",

  HOW_MANY:
    "SELECT COUNT(r.cod_rol) as cantidad FROM roles r \
    where r.nombre_rol =  $1",

  ADD: "INSERT INTO roles(nombre_rol) VALUES ($1) \
  RETURNING cod_rol",

  DELETE: "DELETE FROM roles WHERE cod_rol=$1",

  UPDATE:
    "UPDATE roles SET nombre_rol =$1 WHERE\
  cod_rol=$2",
=======
  FIND_ALL: 'SELECT * FROM roles',

  FIND_BY_ID: 'SELECT * FROM roles WHERE cod_rol = $1',

  HOW_MANY: 'SELECT COUNT(*) as cantidad FROM roles WHERE nombre_rol = $1',

  HOW_MANY_USERS: 'SELECT COUNT(*) as cantidad FROM usuarios WHERE cod_rol = $1',

  HOW_MANY_FUNCTIONALITIES: 'SELECT COUNT(*) as cantidad FROM rel_rol_funcionalidad WHERE cod_rol = $1',

  ADD: 'INSERT INTO roles(nombre_rol) VALUES($1) RETURNING *',

  DELETE: 'DELETE FROM roles WHERE cod_rol = $1',

  UPDATE: 'UPDATE roles SET nombre_rol = $1 WHERE cod_rol = $2 RETURNING *'
>>>>>>> 62f9d91 (Cambios realizados)
};
