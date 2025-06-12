const SQL_REL_ROL_FUNCIONALIDAD = {
    getAll: `
        SELECT rrf.cod_rol, r.nombre_rol, 
               rrf.cod_funcionalidad, f.nombre_funcionalidad, f.url_funcionalidad
        FROM rel_rol_funcionalidad rrf
        INNER JOIN roles r ON r.cod_rol = rrf.cod_rol
        INNER JOIN funcionalidades f ON f.cod_funcionalidad = rrf.cod_funcionalidad
        ORDER BY r.cod_rol, f.cod_funcionalidad`,
    create: `
        INSERT INTO rel_rol_funcionalidad (cod_rol, cod_funcionalidad) 
        VALUES ($1, $2)
        RETURNING cod_rol, cod_funcionalidad`,
    update: `
        UPDATE rel_rol_funcionalidad 
        SET cod_rol = $1, cod_funcionalidad = $2 
        WHERE cod_rol = $3 AND cod_funcionalidad = $4
        RETURNING cod_rol, cod_funcionalidad`,
    delete: `
        DELETE FROM rel_rol_funcionalidad 
        WHERE cod_rol = $1 AND cod_funcionalidad = $2`,
    getByRol: `
        SELECT rrf.cod_rol, r.nombre_rol, 
               rrf.cod_funcionalidad, f.nombre_funcionalidad, f.url_funcionalidad
        FROM rel_rol_funcionalidad rrf
        INNER JOIN roles r ON r.cod_rol = rrf.cod_rol
        INNER JOIN funcionalidades f ON f.cod_funcionalidad = rrf.cod_funcionalidad
        WHERE rrf.cod_rol = $1
        ORDER BY f.cod_funcionalidad`,
    getByFuncionalidad: `
        SELECT rrf.cod_rol, r.nombre_rol, 
               rrf.cod_funcionalidad, f.nombre_funcionalidad, f.url_funcionalidad
        FROM rel_rol_funcionalidad rrf
        INNER JOIN roles r ON r.cod_rol = rrf.cod_rol
        INNER JOIN funcionalidades f ON f.cod_funcionalidad = rrf.cod_funcionalidad
        WHERE rrf.cod_funcionalidad = $1
        ORDER BY r.cod_rol`,
    verifyExists: `
        SELECT COUNT(*) as cantidad 
        FROM rel_rol_funcionalidad 
        WHERE cod_rol = $1 AND cod_funcionalidad = $2`,
    verifyRolExists: `
        SELECT COUNT(*) as cantidad 
        FROM roles 
        WHERE cod_rol = $1`,
    verifyFuncionalidadExists: `
        SELECT COUNT(*) as cantidad 
        FROM funcionalidades 
        WHERE cod_funcionalidad = $1`
};

export default SQL_REL_ROL_FUNCIONALIDAD;