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

describe("Pruebas TarifaDiaria", () => {
    describe("POST /api/Tdiaria/add", () => {
        it("Debería crear una tarifa diaria cuando los datos son válidos", async () => {
            const nuevaTarifa = {
                codParqueadero: 1,
                codTipoVehiculo: 2,
                valorTarifaDiaria: 1000,
            };

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    oneOrNone: jest.fn()
                        .mockResolvedValueOnce({ cantidad: 1 }) // Parqueadero existe
                        .mockResolvedValueOnce({ cantidad: 1 }) // Tipo de vehículo existe
                        .mockResolvedValueOnce({ cantidad: 0 }), // Tarifa no existe
                    one: jest.fn().mockResolvedValueOnce({ }), // Creación exitosa
                });
            });

            const respuesta = await request(app).post("/api/Tdiaria/add").send(nuevaTarifa);

            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toHaveProperty("objCreado");
        });

        it("Debería retornar un error si el parqueadero no existe", async () => {
            const nuevaTarifa = {
                codParqueadero: 1,
                codTipoVehiculo: 2,
                valorTarifaDiaria: 1000,
            };

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    oneOrNone: jest.fn().mockResolvedValueOnce({ cantidad: 0 }), // Parqueadero no existe
                });
            });

            const respuesta = await request(app).post("/api/Tdiaria/add").send(nuevaTarifa);

            expect(respuesta.status).toBe(400);
            expect(respuesta.body.respuesta).toBe("El parqueadero no existe");
        });

        it("Debería retornar un error si el tipo de vehículo no existe", async () => {
            const nuevaTarifa = {
                codParqueadero: 1,
                codTipoVehiculo: 2,
                valorTarifaDiaria: 1000,
            };

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    oneOrNone: jest.fn()
                        .mockResolvedValueOnce({ cantidad: 1 }) // Parqueadero existe
                        .mockResolvedValueOnce({ cantidad: 0 }), // Tipo de vehículo no existe
                });
            });

            const respuesta = await request(app).post("/api/Tdiaria/add").send(nuevaTarifa);

            expect(respuesta.status).toBe(400);
            expect(respuesta.body.respuesta).toBe("El tipo de vehículo no existe");
        });
    });

    describe("PUT /api/Tdiaria/update", () => {
        it("Debería actualizar una tarifa diaria cuando los datos son válidos", async () => {
            const tarifaActualizada = {
                codParqueadero: 1,
                codTipoVehiculo: 2,
                valorTarifaDiaria: 1500,
            };

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    oneOrNone: jest.fn()
                        .mockResolvedValueOnce({ cantidad: 1 }) // Parqueadero existe
                        .mockResolvedValueOnce({ cantidad: 1 }) // Tipo de vehículo existe
                        .mockResolvedValueOnce({ cantidad: 1 }), // Tarifa existe
                    one: jest.fn().mockResolvedValueOnce({ codParqueadero: 1, codTipoVehiculo: 2, valorTarifaDiaria: 1500 }), // Actualización exitosa
                });
            });

            const respuesta = await request(app).put("/api/Tdiaria/update").send(tarifaActualizada);

            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toHaveProperty("objCreado");
        });

        it("Debería retornar un error si la tarifa diaria no existe", async () => {
            const tarifaActualizada = {
                codParqueadero: 1,
                codTipoVehiculo: 2,
                valorTarifaDiaria: 1500,
            };

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    oneOrNone: jest.fn()
                        .mockResolvedValueOnce({ cantidad: 1 }) // Parqueadero existe
                        .mockResolvedValueOnce({ cantidad: 1 }) // Tipo de vehículo existe
                        .mockResolvedValueOnce({ "null":0,cantidad: 0 }), // Tarifa no existe
                });
            });

            const respuesta = await request(app).put("/api/Tdiaria/update").send(tarifaActualizada);

            expect(respuesta.status).toBe(400);
            expect(respuesta.body.respuesta).toBe("La tarifa diaria no existe para el parqueadero y tipo de vehículo especificados");
        });
    });

    describe("DELETE /api/Tdiaria/delete/:codParqueadero/:codTipoVehiculo", () => {
        it("Debería eliminar una tarifa diaria cuando existe", async () => {
            const codParqueadero = 1;
            const codTipoVehiculo = 2;

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    oneOrNone: jest.fn().mockResolvedValueOnce({ cantidad: 1 }), // Tarifa existe
                    result: jest.fn().mockResolvedValueOnce({ rowCount: 1 }), // Eliminación exitosa
                });
            });

            const respuesta = await request(app).delete(`/api/Tdiaria/delete/${codParqueadero}/${codTipoVehiculo}`);

            expect(respuesta.status).toBe(200);
            expect(respuesta.body.respuesta).toBe("Tarifa diaria eliminada correctamente");
        });

        it("Debería retornar un error si la tarifa diaria no existe", async () => {
            const codParqueadero = 1;
            const codTipoVehiculo = 2;

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    oneOrNone: jest.fn().mockResolvedValueOnce(null), // Tarifa no existe
                });
            });

            const respuesta = await request(app).delete(`/api/Tdiaria/delete/${codParqueadero}/${codTipoVehiculo}`);

            expect(respuesta.status).toBe(400);
            expect(respuesta.body.respuesta).toBe("La tarifa diaria que intenta eliminar no existe");
        });
    });

    describe("GET /api/Tdiaria/getall", () => {
        it("Debería retornar todas las tarifas diarias", async () => {
            (pool.result as jest.Mock).mockResolvedValueOnce({
                rows: [
                    { codParqueadero: 1, codTipoVehiculo: 2, valorTarifaDiaria: 1000 },
                    { codParqueadero: 2, codTipoVehiculo: 3, valorTarifaDiaria: 1500 },
                ],
            });

            const respuesta = await request(app).get("/api/Tdiaria/getall");

            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toEqual([
                { codParqueadero: 1, codTipoVehiculo: 2, valorTarifaDiaria: 1000 },
                { codParqueadero: 2, codTipoVehiculo: 3, valorTarifaDiaria: 1500 },
            ]);
        });

        it("Debería retornar un error si ocurre un problema en la base de datos", async () => {
            (pool.result as jest.Mock).mockRejectedValueOnce(new Error("Error en la base de datos"));

            const respuesta = await request(app).get("/api/Tdiaria/getall");

            expect(respuesta.status).toBe(500);
            expect(respuesta.body.respuesta).toBe("Error interno al consultar tarifas diarias");
        });
    });
});