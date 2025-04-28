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
const Sql_rol_1 = require("../repository/Sql_rol");
class ServicioRolActualizar {
    static actualizarRol(objRol, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnetions_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let caso = 1;
                let objActualizado;
                const roles = yield consulta.one(Sql_rol_1.sql_roles.HOW_MANY, [objRol.nombreRol]);
                if (roles.cantidad == 0) {
                    caso = 2;
                    objActualizado = yield consulta.result(Sql_rol_1.sql_roles.UPDATE, [objRol.nombreRol, objRol.codRol]);
                }
                return { caso, objActualizado };
            })).then(({ caso, objActualizado }) => {
                switch (caso) {
                    case 1:
                        res.status(400).json({ respuesta: "Ya existe el rol mano" });
                        break;
                    default:
                        res.status(200).json({ respuesta: "Todo bien", detalle: objActualizado.rowCount, });
                        break;
                }
            }).catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: "Fatal error!!!" });
            });
        });
    }
}
exports.default = ServicioRolActualizar;
