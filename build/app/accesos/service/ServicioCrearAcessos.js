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
const Sql_Accesos_1 = require("../repository/Sql_Accesos");
class ServicioCrearAccesos {
    static crearAcceso(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnetions_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let caso = 1;
                let objGrabado;
                const usuarioExiste = yield consulta.oneOrNone(Sql_Accesos_1.sql_Accesos.getByUserId, [obj.codUsuario]);
                if (!usuarioExiste) {
                    caso = 3;
                }
                else {
                    const access = yield consulta.oneOrNone(Sql_Accesos_1.sql_Accesos.getById, [
                        obj.codUsuario,
                    ]);
                    if (access != null) {
                        caso = 2;
                    }
                    if (access == null) {
                        caso = 4;
                        objGrabado = yield consulta.one(Sql_Accesos_1.sql_Accesos.ADD, [
                            obj.codUsuario,
                            obj.correo,
                            obj.clave,
                            obj.uuid,
                        ]);
                    }
                }
                return { caso, objGrabado };
            }))
                .then(({ caso, objGrabado }) => {
                switch (caso) {
                    case 2:
                        res
                            .status(400)
                            .json({ respuesta: "Ya se encuentra registrado ese usuario" });
                        break;
                    case 3:
                        res
                            .status(400)
                            .json({ respuesta: "El usuario no existe en la base de datos" });
                        break;
                    case 4:
                        res.status(200).json({ objGrabado });
                    default:
                        break;
                }
            })
                .catch((error) => {
                console.log(error);
                res.status(400).json({ respuesta: "Error al crear el acceso" });
            });
        });
    }
}
exports.default = ServicioCrearAccesos;
