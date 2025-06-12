export const sql_funcionalidad = {
    getAll: `SELECT * FROM funcionalidades`,
    getById: `SELECT * FROM funcionalidades WHERE cod_funcionalidad = $1`,
    create: `INSERT INTO funcionalidades (cod_padre_funcionalidad, nombre_funcionalidad, url_funcionalidad) 
             VALUES ($1, $2, $3) 
             RETURNING cod_funcionalidad, cod_padre_funcionalidad, nombre_funcionalidad, url_funcionalidad`,
    update: `UPDATE funcionalidades SET cod_padre_funcionalidad = $2, nombre_funcionalidad = $3, url_funcionalidad = $4 WHERE cod_funcionalidad = $1`,
    delete: `DELETE FROM funcionalidades WHERE cod_funcionalidad = $1`,
    getByParentId: `SELECT * FROM funcionalidades WHERE cod_padre_funcionalidad = $1`,
    getByUserId: `SELECT cod_funcionalidad FROM usuarios WHERE cod_usuario = $1`,
    getByParentIdAndUserId: `SELECT * FROM funcionalidades WHERE cod_padre_funcionalidad = $1 AND cod_usuario = $2`,
    getByUserIdAndParentId: `SELECT * FROM funcionalidades WHERE cod_usuario = $1 AND cod_padre_funcionalidad = $2`,
    getByNameExcludingId: `SELECT * FROM funcionalidades WHERE nombre_funcionalidad = $1 AND cod_funcionalidad != $2`,
    getByUrlExcludingId: `SELECT * FROM funcionalidades WHERE url_funcionalidad = $1 AND cod_funcionalidad != $2`,
    getByName: `SELECT * FROM funcionalidades WHERE nombre_funcionalidad = $1`,
    getByUrl: `SELECT * FROM funcionalidades WHERE url_funcionalidad = $1`,
    countChildren: `SELECT COUNT(*) as count FROM funcionalidades WHERE cod_padre_funcionalidad = $1`,
    countRoles: `SELECT COUNT(*) as count FROM rel_rol_funcionalidad WHERE cod_funcionalidad = $1`,
    countUserRelations: `SELECT COUNT(*) as cantidad FROM rel_usuario_funcionalidad WHERE cod_funcionalidad = $1`,
    countRoleRelations: `SELECT COUNT(*) as cantidad FROM rel_rol_funcionalidad WHERE cod_funcionalidad = $1`,
    countChildFunctionalities: `SELECT COUNT(*) as cantidad FROM funcionalidades WHERE cod_padre_funcionalidad = $1`
};
  