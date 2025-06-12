import request from "supertest";
import express from "express";
import Servidor from "../../../config/api/Servidor";
import pool from "../../../config/connection/dbConnetions";

jest.mock("../../../config/connection/dbConnetions", () => ({
    task: jest.fn(),
    result: jest.fn(),
    one: jest.fn(),
    oneOrNone: jest.fn(),
    any: jest.fn(),
}));

let app: express.Application;

beforeAll(() => {
    const servidor = new Servidor();
    app = servidor.app;
});

describe("Pruebas Turnos", () => {
    describe("POST /api/turno/add", () => {
        it("Debería crear un turno cuando los datos son válidos", async () => {
            const nuevoTurno = {
                CodParqueadero: 5,
                DescripcionTurno: "Turno Mañana",
                FechaTurno: "2023-10-01",
                HoraInicioTurno: "08:00",
                HoraFinTurno: "12:00",
            };

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    one: jest.fn()
                        .mockResolvedValueOnce({ cantidad: 0 }) // Turno no existe
                        .mockResolvedValueOnce({ CodTurno: 13 }), // Creación exitosa
                });
            });

            const respuesta = await request(app).post("/api/turno/add").send(nuevoTurno);

            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toHaveProperty("objCreado");
        });

        it("Debería retornar un error si el turno ya existe", async () => {
            const nuevoTurno = {
                CodParqueadero: 5,
                DescripcionTurno: "Turno Mañana",
                FechaTurno: "2023-10-01",
                HoraInicioTurno: "08:00",
                HoraFinTurno: "12:00",
            };

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    one: jest.fn().mockResolvedValueOnce({ cantidad: 1 }), // Turno ya existe
                });
            });

            const respuesta = await request(app).post("/api/turno/add").send(nuevoTurno);

            expect(respuesta.status).toBe(400);
            expect(respuesta.body.respuesta).toBe("Vale mia eso ya esta");
        });
    });

    describe("PUT /api/turno/update", () => {
        it("Debería actualizar un turno cuando los datos son válidos", async () => {
            const turnoActualizado = {
                CodTurno: 13,
                CodParqueadero: 1,
                DescripcionTurno: "Turno Tarde",
                FechaTurno: "2023-10-01",
                HoraInicioTurno: "13:00",
                HoraFinTurno: "17:00",
            };

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    one: jest.fn().mockResolvedValueOnce({ cantidad: 1 }), // Turno existe
                    result: jest.fn().mockResolvedValueOnce({ rowCount: 1 }), // Actualización exitosa
                });
            });

            const respuesta = await request(app).put("/api/turno/update").send(turnoActualizado);

            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toHaveProperty("objActualizado");
        });

        it("Debería retornar un error si el turno no existe", async () => {
            const turnoActualizado = {
                CodTurno: 13,
                CodParqueadero: 1,
                DescripcionTurno: "Turno Tarde",
                FechaTurno: "2023-10-01",
                HoraInicioTurno: "13:00",
                HoraFinTurno: "17:00",
            };

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    one: jest.fn().mockResolvedValueOnce({ cantidad: 0 }), // Turno no existe
                });
            });

            const respuesta = await request(app).put("/api/turno/update").send(turnoActualizado);

            expect(respuesta.status).toBe(400);
            expect(respuesta.body.respuesta).toBe("Vale mia eso ya esta");
        });
    });

    describe("DELETE /api/turno/delete/:CodTurno", () => {
        it("Debería eliminar un turno cuando no tiene usuarios relacionados", async () => {
            const turnoId = 13;

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    oneOrNone: jest.fn().mockResolvedValueOnce({ CodTurno: turnoId }), // Turno existe
                    any: jest.fn().mockResolvedValueOnce([]), // No hay usuarios relacionados
                    result: jest.fn().mockResolvedValueOnce({ rowCount: 1 }), // Eliminación exitosa
                });
            });

            const respuesta = await request(app).delete(`/api/turno/delete/${turnoId}`);

            expect(respuesta.status).toBe(200);
            expect(respuesta.body.respuesta).toBe("Se elimino Correctamente");
        });

        it("Debería retornar un error si el turno tiene usuarios relacionados", async () => {
            const turnoId = 13;

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    oneOrNone: jest.fn().mockResolvedValueOnce({ CodTurno: turnoId }), // Turno existe
                    any: jest.fn().mockResolvedValueOnce([{ idUsuario: 1 }]), // Hay usuarios relacionados
                });
            });

            const respuesta = await request(app).delete(`/api/turno/delete/${turnoId}`);

            expect(respuesta.status).toBe(400);
            expect(respuesta.body.respuesta).toBe("El turno tiene un usuario relacionado");
        });

        it("Debería retornar un error si el turno no existe", async () => {
            const turnoId = 13;

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    oneOrNone: jest.fn().mockResolvedValueOnce({cantidad:0}), 
                    any: jest.fn().mockResolvedValueOnce([]),
                });
            });

            const respuesta = await request(app).delete(`/api/turno/delete/${turnoId}`);

            expect(respuesta.status).toBe(400);
            expect(respuesta.body.respuesta).toBe("El turno no existe");
        });
    });

    describe("GET /api/turno/getall", () => {
        it("Debería retornar todos los turnos", async () => {
            (pool.result as jest.Mock).mockResolvedValueOnce({
                rows: [
                    { CodTurno: 1, DescripcionTurno: "Turno Mañana" },
                    { CodTurno: 2, DescripcionTurno: "Turno Tarde" },
                ],
            });

            const respuesta = await request(app).get("/api/turno/getall");

            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toEqual([
                { CodTurno: 1, DescripcionTurno: "Turno Mañana" },
                { CodTurno: 2, DescripcionTurno: "Turno Tarde" },
            ]);
        });

        it("Debería retornar un error si ocurre un problema en la base de datos", async () => {
            (pool.result as jest.Mock).mockRejectedValueOnce(new Error("Error en la base de datos"));

            const respuesta = await request(app).get("/api/turno/getall");

            expect(respuesta.status).toBe(400);
            expect(respuesta.body.respuesta).toBe("Coño e la madre");
        });
    });
});