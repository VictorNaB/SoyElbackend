import Ubicacion from '../model/Ubicacion';
import request from "supertest";
import express from "express";
import Servidor from "../../../config/api/Servidor"; // Ajusta la ruta según tu estructura
import pool from "../../../config/connection/dbConnetions"; // Ajusta la ruta
// No es necesario importar rutaUbicacion directamente si Servidor ya lo configura.

// Mockear el pool de conexiones a la BD
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

describe("Pruebas de API para Ubicaciones", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("POST /api/ubicacion/add", () => {
        it("Debería crear una ubicación (nodo raíz) con éxito (201)", async () => {
            const nuevaUbicacion = {
                codExternoUbicacion: "PAIS01",
                nombreUbicacion: "País Ejemplo",
                // codPadreUbicacion se omite para que el servicio lo trate como null
            };
            // Objeto que simula la respuesta de la BD para el nodo raíz
            const mockUbicacionCreadaRaizRespuestaDB = { 
                cod_ubicacion: 1, 
                cod_padre_ubicacion: null, 
                cod_externo_ubicacion: nuevaUbicacion.codExternoUbicacion,
                nombre_ubicacion: nuevaUbicacion.nombreUbicacion
            };

            (pool.task as jest.Mock).mockImplementationOnce(async (callbackOperacion) => {
                const mockConsulta = {
                    one: jest.fn()
                        .mockResolvedValueOnce({ cantidad: 0 }) // Para HOW_MANY
                        .mockResolvedValueOnce(mockUbicacionCreadaRaizRespuestaDB) // Para ADD
                };
                return await callbackOperacion(mockConsulta);
            });
            // Enviar el payload. Si codPadreUbicacion no está, el servicio lo interpreta como null.
            const respuesta = await request(app).post("/api/ubicacion/add").send(nuevaUbicacion); 
            expect(respuesta.status).toBe(201);
            expect(respuesta.body.status).toBe("success");
            expect(respuesta.body.data.nombre_ubicacion).toBe(nuevaUbicacion.nombreUbicacion);
            expect(respuesta.body.data.cod_padre_ubicacion).toBeNull();
        });

        it("Debería crear una ubicación con un padre válido con éxito (201)", async () => {
            const nuevaUbicacionConPadre = {
                codPadreUbicacion: 1, // ID del padre existente (mockUbicacionCreadaRaizRespuestaDB.cod_ubicacion)
                codExternoUbicacion: "DEP01",
                nombreUbicacion: "Departamento Test Con Padre"
            };
            // Esto es lo que esperamos que la BD devuelva para la nueva ubicación con padre
            const mockUbicacionConPadreRespuestaDB = {
                cod_ubicacion: 2, // Nuevo ID asignado por la BD
                cod_padre_ubicacion: nuevaUbicacionConPadre.codPadreUbicacion, // Debería ser 1
                cod_externo_ubicacion: nuevaUbicacionConPadre.codExternoUbicacion,
                nombre_ubicacion: nuevaUbicacionConPadre.nombreUbicacion
            };

            (pool.task as jest.Mock).mockImplementationOnce(async (callbackOperacion) => {
                const mockConsulta = {
                    one: jest.fn()
                        .mockResolvedValueOnce({ cantidad: 0 }) // Para HOW_MANY (asume que "Departamento Test Con Padre" no existe)
                        .mockResolvedValueOnce(mockUbicacionConPadreRespuestaDB) // Para ADD (devuelve el objeto completo)
                };
                return await callbackOperacion(mockConsulta); 
            });
            const respuesta = await request(app).post("/api/ubicacion/add").send(nuevaUbicacionConPadre);
            try {
                console.log("Respuesta.body en POST con padre (intento depuración):", JSON.stringify(respuesta.body, null, 2)); 
            } catch (e) {
                console.log("Error al hacer stringify de respuesta.body:", e);
                console.log("Respuesta status:", respuesta.status);
                console.log("Respuesta headers:", respuesta.headers);
            }
            expect(respuesta.status).toBe(201);
            expect(respuesta.body.status).toBe("success");
            expect(respuesta.body.data.nombre_ubicacion).toBe(nuevaUbicacionConPadre.nombreUbicacion);
            expect(respuesta.body.data.cod_padre_ubicacion).toBe(nuevaUbicacionConPadre.codPadreUbicacion);
        });

        it("Debería retornar error 400 (validacion) si el nombre de la ubicación está vacío", async () => {
            const nuevaUbicacion = { nombreUbicacion: "", codExternoUbicacion: "CE" }; // codExterno también fallará length
            // No se necesita mock de pool.task si la validación de express-validator falla primero
            const respuesta = await request(app).post("/api/ubicacion/add").send(nuevaUbicacion);
            expect(respuesta.status).toBe(400);
            expect(respuesta.body).toHaveProperty("respuesta"); // Clave usada por ValidarDatos.ts
            expect(Array.isArray(respuesta.body.respuesta)).toBe(true);
            expect(respuesta.body.respuesta.some((err: any) => err.path === 'nombreUbicacion' && err.msg.includes("requerido"))).toBe(true);
            expect(respuesta.body.respuesta.some((err: any) => err.path === 'nombreUbicacion' && err.msg.includes("mínimo de 3 caracteres"))).toBe(true);
            expect(respuesta.body.respuesta.some((err: any) => err.path === 'codExternoUbicacion' && err.msg.includes("mínimo de 3 caracteres"))).toBe(true);
        });

        it("Debería retornar error 400 (servicio) si la ubicación ya existe por nombre", async () => {
            const nuevaUbicacion = { nombreUbicacion: "País Repetido", codExternoUbicacion: "PR0123" };
            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({ one: jest.fn().mockResolvedValueOnce({ cantidad: 1 }) });
            });
            const respuesta = await request(app).post("/api/ubicacion/add").send(nuevaUbicacion);
            expect(respuesta.status).toBe(400);
            expect(respuesta.body.status).toBe("error"); // Error del servicio
            expect(respuesta.body.message).toBe("Ya existe una ubicación con ese nombre");
        });

        it("Debería retornar error 500 (servicio) si hay un error interno del servidor al crear", async () => {
            const nuevaUbicacion = { nombreUbicacion: "Error Interno", codExternoUbicacion: "EI0123" };
            (pool.task as jest.Mock).mockImplementationOnce(async () => { throw new Error("Explosion!") });
            const respuesta = await request(app).post("/api/ubicacion/add").send(nuevaUbicacion);
            expect(respuesta.status).toBe(500);
            expect(respuesta.body.status).toBe("error");
            expect(respuesta.body.message).toBe("Error interno del servidor al crear la ubicación");
        });
    });

    describe("GET /api/ubicacion/getAll", () => {
        it("Debería retornar todas las ubicaciones con éxito (200)", async () => {
            const mockUbicaciones = [
                { cod_ubicacion: 1, nombre_ubicacion: "País A"},
                { cod_ubicacion: 2, nombre_ubicacion: "Departamento B" },
            ];
            (pool.result as jest.Mock).mockResolvedValueOnce({ rows: mockUbicaciones, rowCount: mockUbicaciones.length });
            const respuesta = await request(app).get("/api/ubicacion/getAll");
            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toEqual(mockUbicaciones);
        });

        it("Debería retornar error 400 (servicio) si hay un problema de BD al obtener todas", async () => {
            (pool.result as jest.Mock).mockRejectedValueOnce(new Error("Error BD getAll"));
            const respuesta = await request(app).get("/api/ubicacion/getAll");
            expect(respuesta.status).toBe(400);
            expect(respuesta.body.error).toBe("Error al obtener todas las ubicaciones");
        });
    });

    describe("PUT /api/ubicacion/update", () => {
        const ubicacionBase = { codUbicacion: 1, codExternoUbicacion: "PAIS01", nombreUbicacion: "País Original" };
        const mockUbicacionExistente = { cod_ubicacion: 1, cod_externo_ubicacion: "PAIS01", nombre_ubicacion: "País Original", cod_padre_ubicacion: null };
        
        it("Debería actualizar una ubicación con éxito (200)", async () => {
            const datosActualizar = { ...ubicacionBase, nombreUbicacion: "País Actualizado", codPadreUbicacion: null };
            const mockUbicacionActualizada = { ...mockUbicacionExistente, nombre_ubicacion: "País Actualizado" };

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    oneOrNone: jest.fn()
                                .mockResolvedValueOnce(mockUbicacionExistente) // Existe por ID
                                .mockResolvedValueOnce({ cantidad: 0 }), // No hay otra con el nuevo nombre
                    result: jest.fn().mockResolvedValueOnce({ rowCount: 1 }),
                    one: jest.fn().mockResolvedValueOnce(mockUbicacionActualizada) // Retorna la actualizada
                });
            });

            const respuesta = await request(app).put("/api/ubicacion/update").send(datosActualizar);
            expect(respuesta.status).toBe(200);
            expect(respuesta.body.status).toBe("success");
            expect(respuesta.body.data.nombre_ubicacion).toBe("País Actualizado");
        });

        it("Debería retornar error 400 (validacion) si codUbicacion no es un entero", async () => {
            const datosInvalidos = { ...ubicacionBase, codUbicacion: "abc" };
            const respuesta = await request(app).put("/api/ubicacion/update").send(datosInvalidos);
            expect(respuesta.status).toBe(400);
            expect(respuesta.body).toHaveProperty("respuesta");
            expect(respuesta.body.respuesta.some((err: any) => err.path === 'codUbicacion' && err.msg.includes("número entero"))).toBe(true);
        });

        it("Debería retornar error 404 (servicio) si la ubicación a actualizar no existe", async () => {
            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({ oneOrNone: jest.fn().mockResolvedValueOnce(null) });
            });
            const respuesta = await request(app).put("/api/ubicacion/update").send({ codUbicacion: 999, nombreUbicacion: "No Existe Valido", codExternoUbicacion: "NEX123" });
            expect(respuesta.status).toBe(404);
            expect(respuesta.body.status).toBe("error");
            expect(respuesta.body.message).toBe("Ubicación no encontrada para actualizar");
        });

        // TEST CORREGIDO: La validación de express-validator se ejecuta antes que el servicio
        it("Debería retornar error 400 (validacion) si el nombre de la ubicación está vacío al actualizar", async () => {
            const respuesta = await request(app).put("/api/ubicacion/update").send({ ...ubicacionBase, nombreUbicacion: "" });
            
            expect(respuesta.status).toBe(400);
            expect(respuesta.body).toHaveProperty("respuesta"); // Clave usada por ValidarDatos.ts
            expect(Array.isArray(respuesta.body.respuesta)).toBe(true);
            expect(respuesta.body.respuesta.some((err: any) => err.path === 'nombreUbicacion' && err.msg.includes("requerido"))).toBe(true);
            expect(respuesta.body.respuesta.some((err: any) => err.path === 'nombreUbicacion' && err.msg.includes("mínimo de 3 caracteres"))).toBe(true);
        });

        it("Debería retornar error 400 (servicio) si ya existe otra ubicación con el mismo nombre al actualizar", async () => {
            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    oneOrNone: jest.fn()
                                .mockResolvedValueOnce(mockUbicacionExistente) 
                                .mockResolvedValueOnce({ cantidad: 1 }), // Otra ya existe con ese nombre
                });
            });
            const respuesta = await request(app).put("/api/ubicacion/update").send({ ...ubicacionBase, nombreUbicacion: "Nombre Repetido" });
            expect(respuesta.status).toBe(400);
            expect(respuesta.body.status).toBe("error");
            expect(respuesta.body.message).toBe("Ya existe otra ubicación con ese nombre");
        });

        it("Debería retornar error 500 (servicio) si hay un error interno del servidor al actualizar", async () => {
            (pool.task as jest.Mock).mockImplementationOnce(async () => { throw new Error("Explosion Update!")});
            const respuesta = await request(app).put("/api/ubicacion/update").send(ubicacionBase);
            expect(respuesta.status).toBe(500);
            expect(respuesta.body.status).toBe("error");
            expect(respuesta.body.message).toBe("Error interno del servidor al actualizar la ubicación");
        });
    });

    describe("DELETE /api/ubicacion/delete/:codUbicacion", () => {
        const codUbicacionAEliminar = 1;

        it("Debería eliminar una ubicación con éxito (200)", async () => {
            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    one: jest.fn()
                        .mockResolvedValueOnce({ cantidad_parqueaderos_asignados: 0 })
                        .mockResolvedValueOnce({ cantidad_ubicaciones_hijas: 0 }),
                    result: jest.fn().mockResolvedValueOnce({ rowCount: 1 })
                });
            });
            const respuesta = await request(app).delete(`/api/ubicacion/delete/${codUbicacionAEliminar}`);
            expect(respuesta.status).toBe(200);
            expect(respuesta.body.status).toBe("success");
            expect(respuesta.body.message).toBe("Ubicación eliminada exitosamente");
        });
        
        it("Debería retornar error 400 (validacion) si codUbicacion no es un entero", async () => {
            const respuesta = await request(app).delete("/api/ubicacion/delete/abc");
            expect(respuesta.status).toBe(400);
            expect(respuesta.body).toHaveProperty("respuesta");
            expect(respuesta.body.respuesta.some((err: any) => err.path === 'codUbicacion' && err.msg.includes("número entero"))).toBe(true);
        });

        it("Debería retornar error 400 (servicio) si la ubicación tiene parqueaderos asignados", async () => {
            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({ one: jest.fn().mockResolvedValueOnce({ cantidad_parqueaderos_asignados: 1 }) });
            });
            const respuesta = await request(app).delete(`/api/ubicacion/delete/${codUbicacionAEliminar}`);
            expect(respuesta.status).toBe(400);
            expect(respuesta.body.status).toBe("error");
            expect(respuesta.body.message).toBe("No se puede eliminar la ubicación: tiene parqueaderos asignados.");
        });

        it("Debería retornar error 400 (servicio) si la ubicación tiene ubicaciones hijas", async () => {
            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({ 
                    one: jest.fn()
                        .mockResolvedValueOnce({ cantidad_parqueaderos_asignados: 0 })
                        .mockResolvedValueOnce({ cantidad_ubicaciones_hijas: 1 })
                });
            });
            const respuesta = await request(app).delete(`/api/ubicacion/delete/${codUbicacionAEliminar}`);
            expect(respuesta.status).toBe(400);
            expect(respuesta.body.status).toBe("error");
            expect(respuesta.body.message).toBe("No se puede eliminar la ubicación: tiene ubicaciones hijas asignadas.");
        });

        it("Debería retornar error 404 (servicio) si la ubicación a eliminar no se encuentra", async () => {
            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({ 
                    one: jest.fn()
                        .mockResolvedValueOnce({ cantidad_parqueaderos_asignados: 0 })
                        .mockResolvedValueOnce({ cantidad_ubicaciones_hijas: 0 }),
                    result: jest.fn().mockResolvedValueOnce({ rowCount: 0 })
                });
            });
            const respuesta = await request(app).delete(`/api/ubicacion/delete/999`);
            expect(respuesta.status).toBe(404);
            expect(respuesta.body.status).toBe("error");
            expect(respuesta.body.message).toBe("Ubicación no encontrada o ya fue eliminada.");
        });

        it("Debería retornar error 500 (servicio) si hay un error interno del servidor al eliminar", async () => {
            (pool.task as jest.Mock).mockImplementationOnce(async () => { throw new Error("Explosion Delete!") });
            const respuesta = await request(app).delete(`/api/ubicacion/delete/${codUbicacionAEliminar}`);
            expect(respuesta.status).toBe(500);
            expect(respuesta.body.status).toBe("error");
            expect(respuesta.body.message).toBe("Error interno del servidor al procesar la eliminación.");
        });
    });
});
