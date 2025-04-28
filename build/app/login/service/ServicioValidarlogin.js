"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnetions_1 = __importDefault(require("../../../config/connection/dbConnetions"));
const Sql_Login_1 = require("../repository/Sql_Login");
const Sql_Usuario_1 = require("../../usuarios/repository/Sql_Usuario");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Sql_Ingresos_1 = require("../../ingresos/repository/Sql_Ingresos");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const Sql_Accesos_1 = require("../../accesos/repository/Sql_Accesos");
dotenv_1.default.config({ path: "Variables.env" });
class ServicioValidarlogin {
    static Validar(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnetions_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let caso = 1;
                let objvalidado;
                let datosusuario;
                let token;
                const clavecifrada = bcryptjs_1.default.hashSync(obj.claveAcceso);
                console.log("Clave cifrada:", clavecifrada);
                //Verificamos si el usuario existe
                const usuario = yield consulta.oneOrNone(Sql_Login_1.sql_login.VALIDATE, [obj.correoAcceso]);
                console.log("Usuario encontrado:", usuario);
                console.log("Contraseña base de datos", usuario.claveAcceso);
                console.log("Contraseña cifrada", clavecifrada);
                console.log("Contraseña front", obj.claveAcceso);
                const claveCorrecta = bcryptjs_1.default.compareSync(obj.claveAcceso, usuario.claveAcceso);
                console.log("Contraseña correcta:", claveCorrecta);
                if (!usuario || !claveCorrecta) {
                    caso = 3;
                }
                const codUsuario = usuario.codUsuario;
                // Obtiene los datos de acceso del usuario.
                const acceso = yield consulta.oneOrNone(Sql_Login_1.sql_login.GETBYID, [codUsuario]);
                //Verifica si el acceso del usuario es nulo
                if (!acceso) {
                    caso = 2;
                }
                if (claveCorrecta) {
                    caso = 4;
                    // Actualizar UUID para nueva sesión
                    const nuevoUUID = (0, uuid_1.v4)();
                    yield consulta.result(Sql_Accesos_1.sql_Accesos.UPDATE_UUID, [nuevoUUID, codUsuario]);
                    // Registra el inicio de sesión en la tabla ingresos.
                    objvalidado = yield consulta.one(Sql_Ingresos_1.Sql_ingresos.REGISTER_LOGIN, [codUsuario]);
                    // Obtiene los datos del usuario.
                    datosusuario = (yield consulta.one(Sql_Usuario_1.sql_usuarios.FIND_ALL, [codUsuario]));
                    const secret = process.env.JWT_SECRET;
                    token = jsonwebtoken_1.default.sign(datosusuario, secret, { expiresIn: "1m" });
                }
                return { caso, objvalidado, datosusuario, token };
            })).then(({ caso, objvalidado, datosusuario, token }) => {
                switch (caso) {
                    case 2:
                        res.status(400).json({ respuesta: "El usuario no tiene acceso" });
                        break;
                    case 3:
                        res.status(401).json({ respuesta: "El usuario no existe" });
                        break;
                    case 4:
                        res.status(200).json({ respuesta: "inicio de sesion exitoso",
                            usuario: datosusuario,
                            sesion: {
                                codIngreso: objvalidado.codingreso,
                                fechaIngreso: objvalidado.fechaingreso,
                                horaIngreso: objvalidado.horaingreso,
                            },
                            token });
                        break;
                    default:
                        break;
                }
            }).catch((mierror) => {
                console.log(mierror);
                res.status(400).json({ respuesta: "Eso no sirve" });
            });
        });
    }
}
exports.default = ServicioValidarlogin;
