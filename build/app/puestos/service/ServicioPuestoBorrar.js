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
const Sql_ServiciosDiarios_1 = require("../../servicios_diarios/repository/Sql_ServiciosDiarios");
class ServicioPuestoBorrar {
    static borrar(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnetions_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let caso = 0;
                let objeliminado;
                const puesto = yield consulta.one(Sql_Puesto_1.sql_puesto.FIND_BY, [obj.codPuesto]);
                const servidiariorelacionado = yield consulta.any(Sql_ServiciosDiarios_1.Sql_ServiciosDiarios.FIND_BY_PUESTO, [obj.codPuesto]);
                if (puesto == null) {
                    caso = 1;
                }
                if (servidiariorelacionado) {
                    caso = 2;
                }
                objeliminado = yield consulta.one(Sql_Puesto_1.sql_puesto.DELETE, [obj.codPuesto]);
                if (objeliminado.rowCount > 0) {
                    caso = 3;
                }
                else {
                    caso = 4;
                }
                return { caso, objeliminado };
            })).then(({ caso, objeliminado }) => {
                switch (caso) {
                    case 1:
                        res.status(400).json({ respuesta: "El puesto no existe" });
                        break;
                    case 2:
                        res.status(400).json({ respuesta: "El puesto tiene un servicio diario relacionado" });
                        break;
                    case 3:
                        res.status(200).json({ respuesta: "Se elimino Correctamente", "filas borradas": objeliminado.rowCount, });
                        break;
                    case 4:
                        res.status(400).json({ respuesta: "No se pudo eliminar" });
                        break;
                    default:
                        break;
                }
            }).catch((mierror) => {
                console.log(mierror);
                res.status(400).json({ respuesta: "Eso no sirve" });
            });
        });
    }
}
exports.default = ServicioPuestoBorrar;
