import {body, param} from "express-validator";

export const datosAccesoCrear=[
    body("codUsuario","Debe ser un numero").isInt().notEmpty(),
    body("correo","Correo Requerido").isEmail().notEmpty(),
    body("clave","Clave Requerida").isLength({min:5}).notEmpty(),
    body("uuid","UUID Requerido").notEmpty(),

];



export const datoAccesoBorrar=[
    param("codUsuario", "Debe ser un numero").isInt(),
    param("codUsuario","maximo 6 caracteres").isLength({max:5})
]


export const datosAccesoActualizar=[
    body("codUsuario","Codigo Requerido").isInt().notEmpty(),
    body("codUsuario","Codigo Requerido").trim().not().isEmpty(),
   
    body("correo","Correo Requerido").isEmail().notEmpty(),
    body("clave","Clave Requerida").isLength({min:5}).notEmpty(),
    body("uuid","UUID Requerido").notEmpty(),

]