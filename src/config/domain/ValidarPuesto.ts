import { body,param } from "express-validator";

export const datosPuestoCrear=[
    body("CodParqueadero","Debe ser un numero").isInt(),
    body("CodTipoVehiculo","Debe ser un numero").isInt(),
    body("detallePuesto","No puede estar vacio").isLength({min:5})
];

export const datosPuestoEliminar=[
    param("codPuesto", "Debe ser un numero").isInt(),
    param("codPuesto","Maximo 5 caracteres").isLength({max:5})
];

export const datosPuestoActualizar=[
    body("codPuesto","Codigo Requerido").not().isEmpty(),
    body("codPuesto","Codigo debe ser numerico").isInt(),
    body("codPuesto","Codigo Requerido").trim().not().isEmpty(),
    

    body("CodParqueadero","Codigo Requerido").not().isEmpty(),
    body("CodParqueadero"," Codigo Debe ser  numerico").isInt(),
    body("CodParqueadero","Puesto Requerido").trim().not().isEmpty(),
 

    body("CodTipoVehiculo","Codigo Requerido").not().isEmpty(),
    body("CodTipoVehiculo","Codigo debe ser numerico").isInt(),
    body("CodTipoVehiculo","Codigo Requerido").trim().not().isEmpty(),
  

    body("detallePuesto","No puede estar vacio").not().isEmpty(),
    body("detallePuesto","Debe tener minimo 5 caracteres").isLength({min:5}),
];
