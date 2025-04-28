"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sql_usuarios = void 0;
exports.sql_usuarios = {
    FIND_ALL: `
    SELECT u.cod_usuario AS "codUsuario",
         u.nombres_usuario AS "nombreUsuario",
         u.apellidos_usuario AS "apellidosUsuario",
         r.nombre_rol AS "nombreRol"
    FROM usuarios u
    INNER JOIN roles r ON u.cod_rol = r.cod_rol
    WHERE u.cod_usuario = $1;`,
    FIND_BY_ID: "SELECT * FROM usuarios",
    FIND_BY_DOCUMENTO: "SELECT documento_usuario FROM usuarios WHERE documento_usuario=$1",
    HOW_MANY: "SELECT COUNT(cod_usuario) as cantidad FROM usuarios WHERE cod_usuario = $1",
    ADD: "INSERT INTO usuarios(cod_rol, documento_usuario, nombres_usuario, apellidos_usuario, genero_usuario, fecha_nacimiento_usuario, telefono_usuario)   VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING cod_usuario",
    UPDATE: "UPDATE usuarios SET cod_rol = $1, documento_usuario = $2, nombres_usuario = $3, apellidos_usuario = $4, genero_usuario = $5, fecha_nacimiento_usuario = $6, telefono_usuario = $7 WHERE cod_usuario = $8",
    DELETE: "DELETE FROM usuarios WHERE cod_usuario = $1",
};
