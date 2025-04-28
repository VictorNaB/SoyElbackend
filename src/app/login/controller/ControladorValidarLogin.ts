import { Response,Request } from "express";
import ServicioValidarlogin from "../service/ServicioValidarlogin";
import Login from "../model/Login";


class ControladorValidarLogin extends ServicioValidarlogin{
    public llamarValidar(req:Request, res:Response):void{
        console.log(req.body);
        const objvalidar= new Login("","");
        objvalidar.correoAcceso=req.body.correoAcceso;
        objvalidar.claveAcceso=req.body.claveAcceso;
        ServicioValidarlogin.Validar(objvalidar,res);

    }

}

const controladorValidarLogin= new ControladorValidarLogin();
export default controladorValidarLogin;