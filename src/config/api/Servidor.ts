import Express from "express";
import cors from "cors";
import morgan from "morgan";
import rutalRolApi from "../../app/roles/route/RutaRol";
import rutaPuestoApi from "../../app/puestos/route/RutaPuesto";
import rutaServiciosDiariosApi from "../../app/servicios_diarios/route/Ruta_ServiciosDiarios";
import rutaloginApi from "../../app/login/route/rutalogin";
import segurity from "../../middleware/Segurity";
import rutaAcceso from "../../app/accesos/route/RutaAccesos";
import rutaUsuarioApi from "../../app/usuarios/route/RutaUsuario";
import RutaAccesoApi from "../../app/accesos/route/RutaAccesos";
import rutaTurnoApi from "../../app/turnos/route/Ruta_Turno";
import rutaServicioRelTurnoUsuarioApi from "../../app/rel_turno_usuario/route/RutaRel_Turno_Usuario";
class Servidor{

    public app: Express.Application

    constructor(){
        this.app= Express();
        
        this.app.set("PORT", 3123); //Solo se usa el set para el puerto
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(Express.json({limit:"100Mb"}));
        this.app.use(Express.urlencoded({extended:true}));


        this.app.use("/api/rol",rutalRolApi);
        this.app.use("/api/puesto",rutaPuestoApi);
        this.app.use("/api/acceso",RutaAccesoApi);
        this.app.use("/api/Sdiario",rutaServiciosDiariosApi);
        this.app.use("/api/usuario",rutaUsuarioApi)
        this.app.use("/api/Turno",rutaTurnoApi);
        this.app.use("/api/TurnoUsuario",rutaServicioRelTurnoUsuarioApi)
        
        this.app.use("/api/login",rutaloginApi)

    }


    public arranquelo():void{
        this.app.listen(this.app.get("PORT"), ()=>{
            console.log("Listo el backend en el puerto", this.app.get("PORT"))
        });
    }



}

//Siempre que este programando en api tienes que exportar algo

export default Servidor;