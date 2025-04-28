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
const Sql_Turnos_1 = require("../repository/Sql_Turnos");
class ServicioActualizarTurno {
    static ActualizarTurno(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnetions_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let caso = 1;
                let ObjActualizado;
                const Turno = yield consulta.one(Sql_Turnos_1.sql_Turnos.HOW_MANY, [obj.CodTurno]);
                if (Turno.cantidad) {
                    caso = 2;
                    ObjActualizado = yield consulta.result(Sql_Turnos_1.sql_Turnos.UPDATE, [obj.CodTurno, obj.CodParqueadero, obj.DescripcionTurno, obj.FechaTurno, obj.HoraInicio, obj.HoraFin]);
                }
                return { caso, ObjActualizado };
            })).then(({ caso, ObjActualizado }) => {
                switch (caso) {
                    case 1:
                        res.status(400).json({ respuesta: "El turno no existe" });
                        break;
                    case 2:
                        res.status(200).json({ respuesta: "Turno Actualizado", ObjActualizado });
                        break;
                    default:
                        break;
                }
            }).catch((mierror) => {
                console.log(mierror);
                res.status(400).json({ respuesta: "Ta malo" });
            });
        });
    }
}
exports.default = ServicioActualizarTurno;
