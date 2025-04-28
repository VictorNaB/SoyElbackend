"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sql_turno_usuario = void 0;
exports.sql_turno_usuario = {
    FIND_BY_TURNO: "SELECT cod_turno \
    FROM rel_turno_usuario WHERE cod_turno=$1",
};
