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
class ServicicioActualizarUsuario {
    static ActualizarUsuario(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnetions_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let caso = 1;
                let objActualizado;
                const usuario = yield consulta.one(Sql_Usuario_1.sql_usuarios.HOW_MANY, [obj.codUsuario]);
                if (usuario.cantidad) {
                    caso = 2;
                    objActualizado = yield consulta.one(Sql_Usuario_1.sql_usuarios.UPDATE, [obj.codRol, obj.documentoUsuario, obj.nombresUsuario, obj.apellidosUsuario, obj.generoUsuario, obj.fechaNacimientoUsuario, obj.telefonoUsuario]);
                }
                return { caso, objActualizado };
            })).then(({ caso, objActualizado }) => {
                switch (caso) {
                    case 1:
                        res.status(400).json({ respuesta: "Vale mia eso ya esta" });
                        break;
                    default:
                        res.status(200).json({ objActualizado });
                        break;
                }
            }).catch((mierror) => {
                console.log("Error en la base de datos", mierror);
                res.status(400).json("No sirve");
            });
        });
    }
}
exports.default = ServicicioActualizarUsuario;
