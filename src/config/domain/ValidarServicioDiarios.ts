import {body, param} from "express-validator";

export const datosServiciodiariosCrear=[
    body("CodParqueadero","Debe ser un numero").isInt().notEmpty(),
    body("CodVehiculo","Debe ser un numero").isInt(),
    body("CodPuesto","Debe ser un numero").isInt(),
    body("FechaInicio","Debe ser una fecha valida").isISO8601().toDate(),
    body("FechaFin","Debe ser una fecha valida").isISO8601().toDate(),
    body("ValorDiario","Debe ser un numero").isFloat()

];



export const datoServiciosdiariosBorrar=[
    param("CodServicioDiarios", "Debe ser un numero").isInt(),
    param("CodServicioDiarios","maximo 6 caracteres").isLength({max:5})
]


export const datosServicioDiarioActualizar=[
    body("CodServicioDiarios","Codigo Requerido").isInt().notEmpty(),
    body("CodServicioDiarios","Codigo Requerido").trim().not().isEmpty(),
   

    body("CodParqueadero","Codigo Requerido").isInt().notEmpty(),
    body("CodParqueadero","Puesto Requerido").trim().not().isEmpty(),
   

    body("CodVehiculo","Codigo Requerido").isInt().notEmpty(),
    body("CodVehiculo","Codigo Requerido").trim().not().isEmpty(),
  

    body("FechaInicio","Codigo Requerido").not().isEmpty(),
    body("FechaInicio","Debe ser una fecha valida").isISO8601().toDate(),
   

    body("FechaFin","Debe ser una fecha valida").isISO8601().toDate(),
    
    
    body("ValorDiario","Debe ser un numero").isFloat({min:0}),
    body("ValorDiario","Codigo Requerido").trim().not().isEmpty(),
    body("ValorDiario","Debe tener maximo 5 caracteres").isLength({max:5}),
]