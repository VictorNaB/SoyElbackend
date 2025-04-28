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
const Sql_ServiciosDiarios_1 = require("../repository/Sql_ServiciosDiarios");
class ServicioActualizarServiciosDiarios {
    static Actualizar(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnetions_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let caso = 1;
                let objCre;
                const ServicioDiario = yield consulta.one(Sql_ServiciosDiarios_1.Sql_ServiciosDiarios.HOW_MANY, [obj.CodServicioDiarios]);
                if (ServicioDiario.cantidad) {
                    caso = 2;
                    objCre = yield consulta.result(Sql_ServiciosDiarios_1.Sql_ServiciosDiarios.UPDATE, [obj.CodServicioDiarios, obj.CodParqueadero, obj.CodVehiculo, obj.CodPuesto, obj.FechaInicio, obj.FechaFin, obj.ValorDiario]);
                }
                return { caso, objCre };
            })).then(({ caso, objCre }) => {
                switch (caso) {
                    case 1:
                        res.status(400).json({ respuesta: "Vale mia eso ya esta" });
                        break;
                    default:
                        res.status(200).json({ objCre });
                        break;
                }
            }).catch((mierror) => {
                console.log(mierror);
                res.status(400).json({ respuesta: "Mano eso no sirvio" });
            });
        });
    }
}
exports.default = ServicioActualizarServiciosDiarios;
