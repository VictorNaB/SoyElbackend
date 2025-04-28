import {body, param} from "express-validator";

export const datosTurnoCrear=[
    body("CodParqueadero","Debe ser un numero").isInt().notEmpty(),
    body("DescripcionTurno","Descripcion Requerida").notEmpty(),
    body("FechaTurno","Debe ser una fecha valida").notEmpty(),
    body("HoraInicio","La Hora no puede estar vacia").notEmpty(),
    body("HoraFin","Debe ser una Hora valida").notEmpty(),

];



export const datoTurnosBorrar=[
    
    param("CodTurno", "Debe ser un numero").isInt(),
    param("CodTurno","maximo 6 caracteres").isLength({max:5})
]


export const datosTurnosActualizar=[
    body("CodTurno", "Debe ser un numero").isInt(),
    body("CodTurno","maximo 6 caracteres").isLength({max:5}),
    body("CodParqueadero","Debe ser un numero").isInt().notEmpty(),
    body("DescripcionTurno","Descripcion Requerida").trim().not().isEmpty(),
    body("FechaTurno","Debe ser una fecha valida").notEmpty(),
    body("HoraInicio","Hora inicio no puede estar vacia").notEmpty(),
    body("HoraFin","Hora fin no puede estar vacia").notEmpty(),
]