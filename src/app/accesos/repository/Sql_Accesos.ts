
export const sql_Accesos={
    

export const sql_Accesos = {
    GETALL: `SELECT * FROM accesos`,
    getById: `SELECT * FROM accesos WHERE cod_usuario = $1`,
    ADD: `INSERT INTO accesos (cod_usuario, correo_acceso, clave_acceso, uuid_acceso) VALUES ($1, $2, $3, $4) returning cod_usuario`,
    UPDATE: `UPDATE accesos SET correo_acceso = $2, clave_acceso = $3, uuid_acceso = $4 WHERE cod_usuario = $1`,
    DELETE: `DELETE FROM accesos WHERE cod_usuario = $1`,
    getByCorreo: `SELECT * FROM accesos WHERE correo_acceso = $1`,
    getByUuid: `SELECT * FROM accesos WHERE uuid_acceso = $1`, // Agregado para obtener por UUID
    getByUserId: `SELECT cod_usuario FROM usuarios WHERE cod_usuario = $1`,
    DevolverUsuario: "Select u.cod_usuario as codUsuario, u.nombres_usuario as nombreUsuario,",
    UPDATE_UUID:
    "UPDATE accesos SET uuid_acceso = $2 \
    WHERE cod_usuario = $1 \
    RETURNING cod_usuario as codUsuario, \
        correo_acceso as correoAcceso, \
        clave_acceso as claveAcceso, \
        uuid_acceso as uuidAcceso"
}

    getByUuid: `SELECT * FROM accesos WHERE uuid_acceso = $1`,
    getByUserId: `SELECT cod_usuario FROM usuarios WHERE cod_usuario = $1`,
    DevolverUsuario: "Select u.cod_usuario as codUsuario, u.nombres_usuario as nombreUsuario,",
    UPDATE_UUID: "UPDATE accesos SET uuid_acceso = $1 WHERE cod_usuario = $2 RETURNING cod_usuario as codUsuario, correo_acceso as correoAcceso, clave_acceso as claveAcceso, uuid_acceso as uuidAcceso",
    getUserById: `SELECT * FROM usuarios WHERE cod_usuario = $1`,
    getByCorreoExcludingId: `SELECT * FROM accesos WHERE correo_acceso = $1 AND cod_usuario != $2`
};


