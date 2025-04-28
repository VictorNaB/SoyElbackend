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
const Sql_Usuario_1 = require("../repository/Sql_Usuario");
class ServicioCrearUsuario {
    static CrearUsuario(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnetions_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let caso = 1;
                let objCreado;
                const usuariodocumento = yield consulta.oneOrNone(Sql_Usuario_1.sql_usuarios.FIND_BY_DOCUMENTO, [obj.documentoUsuario]);
                if (usuariodocumento) {
                    caso = 3;
                }
                const usuario = yield consulta.one(Sql_Usuario_1.sql_usuarios.HOW_MANY, [obj.codUsuario]);
                if (usuario.cantidad == 0) {
                    caso = 2;
                    objCreado = yield consulta.one(Sql_Usuario_1.sql_usuarios.ADD, [obj.codRol, obj.documentoUsuario, obj.nombresUsuario, obj.apellidosUsuario, obj.generoUsuario, obj.fechaNacimientoUsuario, obj.telefonoUsuario]);
                }
                return { caso, objCreado };
            })).then(({ caso, objCreado }) => {
                switch (caso) {
                    case 1:
                        res.status(400).json({ respuesta: "Vale mia eso ya esta" });
                        break;
                    case 2:
                        res.status(200).json({ objCreado });
                        break;
                    case 3:
                        res.status(400).json({ respuesta: "Ya existe un usuario con ese documento" });
                        break;
                    default:
                        break;
                }
            }).catch((mierror) => {
                console.log("Error en la base de datos", mierror);
                res.status(400).json("No sirve");
            });
        });
    }
}
exports.default = ServicioCrearUsuario;
