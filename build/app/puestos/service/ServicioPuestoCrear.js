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
class ServicioPuestoCrear {
    static CrearPuesto(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnetions_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let caso = 1;
                let objCreado;
                const Puestos = yield consulta.one(Sql_Puesto_1.sql_puesto.HOW_MANY, [obj.detallePuesto]);
                if (Puestos.cantidad == 0) {
                    caso = 2;
                    objCreado = yield consulta.one(Sql_Puesto_1.sql_puesto.ADD, [obj.CodParqueadero, obj.CodTipoVehiculo, obj.detallePuesto]);
                }
                return { caso, objCreado };
            })).then(({ caso, objCreado }) => {
                switch (caso) {
                    case 1:
                        res.status(400).json({ respuesta: "Vale mia eso ya esta" });
                        break;
                    default:
                        res.status(200).json({ objCreado });
                        break;
                }
            }).catch((mierror) => {
                console.log(mierror);
                res.status(400).json({ respuesta: "Eso no sirvio compae" });
            });
        });
    }
}
exports.default = ServicioPuestoCrear;
