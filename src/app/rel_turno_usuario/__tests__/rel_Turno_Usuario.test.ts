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

describe("Pruebas Rel_Turno_Usuario", () => {
    describe("POST /api/RelTurno/add", () => {
        it("Debería crear una relación turno-usuario cuando los datos son válidos", async () => {
            const nuevaRelacion = {
                CodTurno: 1,
                CodUsuario: 2,
            };

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    one: jest.fn()
                        .mockResolvedValueOnce({ cantidad: 0 }) // Relación no existe
                        .mockResolvedValueOnce({ CodUsuario: 13 }), // Creación exitosa
                });
            });

            const respuesta = await request(app).post("/api/RelTurno/add").send(nuevaRelacion);

            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toHaveProperty("objCreado");
        });

        it("Debería retornar un error si la relación ya existe", async () => {
            const nuevaRelacion = {
                CodTurno: 1,
                CodUsuario: 2,
            };

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    one: jest.fn().mockResolvedValueOnce({ cantidad: 1 }), // Relación ya existe
                });
            });

            const respuesta = await request(app).post("/api/RelTurno/add").send(nuevaRelacion);

            expect(respuesta.status).toBe(400);
            expect(respuesta.body.respuesta).toBe("Vale mia eso ya esta");
        });
    });

    describe("PUT /api/RelTurno/update", () => {
        it("Debería actualizar una relación turno-usuario cuando los datos son válidos", async () => {
            const relacionActualizada = {
                CodTurnoUsuario: 13,
                CodTurno: 1,
                CodUsuario: 2,
            };

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    one: jest.fn().mockResolvedValueOnce({ cantidad: 1 }), // Relación existe
                    result: jest.fn().mockResolvedValueOnce({ rowCount: 1 }), // Actualización exitosa
                });
            });

            const respuesta = await request(app).put("/api/RelTurno/update").send(relacionActualizada);

            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toHaveProperty("objActualizado");
        });

        it("Debería retornar un error si la relación no existe", async () => {
            const relacionActualizada = {
                CodTurnoUsuario: 13,
                CodTurno: 1,
                CodUsuario: 2,
            };

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    one: jest.fn().mockResolvedValueOnce({ cantidad: 0 }), // Relación no existe
                });
            });

            const respuesta = await request(app).put("/api/RelTurno/update").send(relacionActualizada);

            expect(respuesta.status).toBe(400);
            expect(respuesta.body.respuesta).toBe("No existe esa relacion, no se puede actualizar");
        });
    });

    describe("DELETE /api/RelTurno/delete/:CodTurnoUsuario", () => {
        it("Debería eliminar una relación turno-usuario cuando existe", async () => {
            const relacionId = 13;

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    result: jest.fn().mockResolvedValueOnce({ rowCount: 1 }), // Eliminación exitosa
                });
            });

            const respuesta = await request(app).delete(`/api/RelTurno/delete/${relacionId}`);

            expect(respuesta.status).toBe(200);
            expect(respuesta.body.respuesta).toBe("Se elimino Correctamente");
        });

        it("Debería retornar un error si ocurre un problema durante la eliminación", async () => {
            const relacionId = 13;

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                throw new Error("Error en la base de datos");
            });

            const respuesta = await request(app).delete(`/api/RelTurno/delete/${relacionId}`);

            expect(respuesta.status).toBe(400);
            expect(respuesta.body.respuesta).toBe("Eso no sirve");
        });
    });

    describe("GET /api/RelTurno/getall", () => {
        it("Debería retornar todas las relaciones turno-usuario", async () => {
            (pool.result as jest.Mock).mockResolvedValueOnce({
                rows: [
                    { CodTurnoUsuario: 1, CodTurno: 1, CodUsuario: 2 },
                    { CodTurnoUsuario: 2, CodTurno: 2, CodUsuario: 3 },
                ],
            });

            const respuesta = await request(app).get("/api/RelTurno/getall");

            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toEqual([
                { CodTurnoUsuario: 1, CodTurno: 1, CodUsuario: 2 },
                { CodTurnoUsuario: 2, CodTurno: 2, CodUsuario: 3 },
            ]);
        });

        it("Debería retornar un error si ocurre un problema en la base de datos", async () => {
            (pool.result as jest.Mock).mockRejectedValueOnce(new Error("Error en la base de datos"));

            const respuesta = await request(app).get("/api/RelTurno/getall");

            expect(respuesta.status).toBe(400);
            expect(respuesta.body.respuesta).toBe("Conoces A yaper? Bueno ya perdiste");
        });
    });
});