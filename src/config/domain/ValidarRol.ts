import {body, param} from "express-validator";

export const datosRolCrear=[
    body("nombreRol","Rol requerido").not().isEmpty(),
    body("nombreRol", "Minimo 5 caracteres").isLength({min:5}),
];



export const datosRolBorrar=[
    param("codRol", "Debe ser un numero").isInt(),
    param("codRol","maximo 6 caracteres").isLength({max:5})
]


export const datosRolActualizar=[
    body("codRol", "Codigo Requerido").not().isEmpty(),
    body("codRol", "Codigo debe ser numerico").isInt(),
    body("codRol", "Rol Requerido").trim().not().isEmpty(),
    body("codRol", "Minimo 5 caracteres").not().isLength({min:5}),
]