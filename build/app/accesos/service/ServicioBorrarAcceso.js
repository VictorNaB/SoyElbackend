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
class ServicioBorrarAcceso {
    static BorrarAcceso(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnetions_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let caso = 1;
                const access = yield consulta.oneOrNone(Sql_Accesos_1.sql_Accesos.getById, [
                    obj.codUsuario,
                ]);
                if (access == null) {
                    caso = 2;
                }
                else {
                    yield consulta.none(Sql_Accesos_1.sql_Accesos.DELETE, [obj.codUsuario]);
                    caso = 1;
                }
                return { caso, obj };
            }))
                .then(({ caso, obj }) => {
                switch (caso) {
                    case 2:
                        res
                            .status(400)
                            .json({ respuesta: "El acceso no existe en la base de datos" });
                        break;
                    default:
                        res.status(200).json({
                            respuesta: "Acceso eliminado correctamente",
                            detalle: obj,
                        });
                        break;
                }
            })
                .catch((error) => {
                console.log(error);
                res.status(400).json({
                    respuesta: "Error al eliminar el acceso",
                    detalle: error.message,
                });
            });
        });
    }
}
exports.default = ServicioBorrarAcceso;
