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
const Sql_Puesto_1 = require("../repository/Sql_Puesto");
class ServicioPuestoConsulta {
    static obtenerPuestos(res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnetions_1.default
                .result(Sql_Puesto_1.sql_puesto.FIND_ALL)
                .then((misDatos) => {
                res.status(200).json(misDatos.rows);
            }).catch((mierror) => {
                console.log(mierror);
                res.status(400).json({ respuesta: "Conoces A yaper? Bueno ya perdiste" });
            });
        });
    }
}
exports.default = ServicioPuestoConsulta;
