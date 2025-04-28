import { body,param } from "express-validator";



export const datosvalidar=[
    body("correoAcceso","No puede estar vacio").trim().not().isEmpty(),
    body("correoAcceso","debe tener minimo 5 caracteres").isLength({min:5}),
    body("claveAcceso","No puede estar vacio").trim().not().isEmpty(),
    body("claveAcceso","debe tener minimo 5 caracteres").isLength({min:5})
];