export const sql_login={
    VALIDATE:`
    SELECT a.cod_usuario, a.clave_acceso
    FROM accesos a
    INNER JOIN usuarios u ON a.cod_usuario = u.cod_usuario
    INNER JOIN roles r ON u.cod_rol = r.cod_rol
    WHERE a.correo_acceso = $1;`,
 
  GETBYID: `SELECT * FROM accesos WHERE cod_usuario = $1`,
<<<<<<< HEAD
=======
  
  LOGIN_USUARIO: "SELECT cod_usuario , clave_acceso from accesos\
    where correo_acceso = $1 ",
>>>>>>> 62f9d91 (Cambios realizados)


}