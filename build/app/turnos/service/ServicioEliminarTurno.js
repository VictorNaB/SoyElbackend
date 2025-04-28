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
const Sql_Rel_Turno_Usuario_1 = require("../../rel_turno_usuario/repository/Sql_Rel_Turno_Usuario");
class ServicioEliminarTurno {
    static Eliminar(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnetions_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let caso = 0;
                let objeliminado;
                const turno = yield consulta.one(Sql_Turnos_1.sql_Turnos.FIND_BY, [obj.CodTurno]);
                if (!turno) {
                    caso = 1;
                }
                const relTurnoUsuario = yield consulta.oneOrNone(Sql_Rel_Turno_Usuario_1.sql_rel_turno_usuario.FIND_BY_TURNO, [obj.CodTurno]);
                if (relTurnoUsuario) {
                    caso = 2;
                }
                if (turno && !relTurnoUsuario) {
                    caso = 3;
                    objeliminado = yield consulta.result(Sql_Turnos_1.sql_Turnos.DELETE, [obj.CodTurno]);
                }
                return { caso, objeliminado };
            })).then(({ caso, objeliminado }) => {
                switch (caso) {
                    case 1:
                        res.status(400).json({ respuesta: "El turno no existe" });
                        break;
                    case 2:
                        res.status(400).json({ respuesta: "El turno tiene un usuario relacionado" });
                        break;
                    case 3:
                        res.status(200).json({ respuesta: "Se elimino correctamente", "filas borradas": objeliminado.rowCount });
                        break;
                    default:
                        break;
                }
            }).catch((mierror) => {
                console.log(mierror);
                res.status(400).json({ respuesta: "No sirve" });
            });
        });
    }
}
exports.default = ServicioEliminarTurno;
