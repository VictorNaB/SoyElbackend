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
class ServicioRolConsulta {
    static obtenerTodos(res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnetions_1.default
                .result(Sql_rol_1.sql_roles.FIND_ALL)
                .then((misDatos) => {
                res.status(200).json(misDatos.rows);
            }).catch((miError) => {
                console.log(miError);
                res.status(400).json({ Respuesta: "Se totio el SQL mano" });
            });
        });
    }
}
exports.default = ServicioRolConsulta;
