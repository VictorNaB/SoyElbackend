export const sql_personas={
FIND_ALL: "SELECT p.idpersonas, p.nombre, p.apellido, p.dni, p.fecha_nacimiento, p.domicilio, p.telefono, p.email, p.idroles, r.nombre as rol from personas p inner join roles r on p.idroles = r.idroles" ,    
}