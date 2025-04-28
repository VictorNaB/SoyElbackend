
import {body, param} from "express-validator";

export const datosRelTurnoUsuarioCrear=[
    body("CodTurno","Debe ser un numero").isInt().notEmpty(),
    body("CodUsuario","Debe ser un numero").isInt().notEmpty(),

];



export const datoRelTurnoUsuarioBorrar=[
    
    param("CodTurnoUsuario", "Debe ser un numero").isInt(),
    param("CodTurnoUsuario","maximo 6 caracteres").isLength({max:5})
]


export const datosRelTurnoUsuarioActualizar=[
    body("CodTurnoUsuario", "Debe ser un numero").isInt(),
    body("CodTurnoUsuario","maximo 6 caracteres").isLength({max:5}),
    body("CodTurno","Debe ser un numero").isInt().notEmpty(),
    body("CodUsuario","Debe ser un numero").isInt().notEmpty(),
]