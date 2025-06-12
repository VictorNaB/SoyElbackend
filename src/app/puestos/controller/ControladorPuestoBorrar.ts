import { Request,Response } from "express";
import ServicioPuestoBorrar from "../service/ServicioPuestoBorrar";
import Puesto from "../model/Puesto";


class ControladorPuestoBorrar extends ServicioPuestoBorrar{
    public llamarBorrar(req:Request,res:Response):void{
        console.log("Cuerpo peticion",req.params)
        console.log('ID recibido para eliminar:', req.params.codPuesto);
        const codigo=Number(req.params.codPuesto);
        const objpues=new Puesto(codigo,0,0,"");
        ServicioPuestoBorrar.borrar(objpues,res);
    }

}

const controladorPuestoBorrar=new ControladorPuestoBorrar();
export default controladorPuestoBorrar;