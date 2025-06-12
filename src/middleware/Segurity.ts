import {NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

class Segurity{

    public check(req:Request, res:Response, next: NextFunction):any{
        if(!req.headers.authorization){
            res.status(401).json({respuesta:"Te falto el token"});
        }else{
            try {
                // Verificamos el token
                const miToken = req.headers.authorization?.split(" ")[1] as string;
                const datos = jwt.verify(miToken, "miclavesecretaultrasegura");
                next();
                
            } catch (error) {
                res.status(401).json({respuesta:"Falsificaste el token"});
            }
        }
        
    }



}

const segurity=new Segurity();
export default segurity;
