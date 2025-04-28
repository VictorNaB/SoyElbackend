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
const Sql_ServiciosDiarios_1 = require("../repository/Sql_ServiciosDiarios");
const dbConnetions_1 = __importDefault(require("../../../config/connection/dbConnetions"));
class Servicios_DiariosConsulta {
    static ConsultaDiarios(res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnetions_1.default.result(Sql_ServiciosDiarios_1.Sql_ServiciosDiarios.FIND_ALL).
                then((misdatos) => {
                res.status(200).json(misdatos.rows);
            }).catch((mierror) => {
                console.log(mierror);
                res.status(400).json({ respuesta: "Coño e la madre" });
            });
        });
    }
}
exports.default = Servicios_DiariosConsulta;
