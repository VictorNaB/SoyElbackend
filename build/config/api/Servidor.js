"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const RutaRol_1 = __importDefault(require("../../app/roles/route/RutaRol"));
const RutaPuesto_1 = __importDefault(require("../../app/puestos/route/RutaPuesto"));
const Ruta_ServiciosDiarios_1 = __importDefault(require("../../app/servicios_diarios/route/Ruta_ServiciosDiarios"));
const rutalogin_1 = __importDefault(require("../../app/login/route/rutalogin"));
const RutaUsuario_1 = __importDefault(require("../../app/usuarios/route/RutaUsuario"));
const RutaAccesos_1 = __importDefault(require("../../app/accesos/route/RutaAccesos"));
const Ruta_Turno_1 = __importDefault(require("../../app/turnos/route/Ruta_Turno"));
const RutaRel_Turno_Usuario_1 = __importDefault(require("../../app/rel_turno_usuario/route/RutaRel_Turno_Usuario"));
class Servidor {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.set("PORT", 3123); //Solo se usa el set para el puerto
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(express_1.default.json({ limit: "100Mb" }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use("/api/rol", RutaRol_1.default);
        this.app.use("/api/puesto", RutaPuesto_1.default);
        this.app.use("/api/acceso", RutaAccesos_1.default);
        this.app.use("/api/Sdiario", Ruta_ServiciosDiarios_1.default);
        this.app.use("/api/usuario", RutaUsuario_1.default);
        this.app.use("/api/Turno", Ruta_Turno_1.default);
        this.app.use("/api/TurnoUsuario", RutaRel_Turno_Usuario_1.default);
        this.app.use("/api/login", rutalogin_1.default);
    }
    arranquelo() {
        this.app.listen(this.app.get("PORT"), () => {
            console.log("Listo el backend en el puerto", this.app.get("PORT"));
        });
    }
}
//Siempre que este programando en api tienes que exportar algo
exports.default = Servidor;
