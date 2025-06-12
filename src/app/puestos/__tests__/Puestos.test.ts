import request from "supertest";
import express from "express";
import Servidor from "../../../config/api/Servidor";
import pool from "../../../config/connection/dbConnetions";


// Mock de la conexión a la base de datos
jest.mock("../../../config/connection/dbConnetions", () => ({
    connect: jest.fn(),
    result: jest.fn(),
    oneOrNone: jest.fn(),
    one: jest.fn(),
    none: jest.fn(),
    task: jest.fn(),
  }));

describe("Pruebas puestos",()=>{
    let app: express.Application;

    beforeAll(() => {
        const servidor = new Servidor();
        app = servidor.app;
    });
    
    afterAll(() => {
        // Limpieza después de todas las pruebas
        jest.clearAllMocks();
    });
    describe(" GET api/puesto/getall",()=>{
        it("Deberia retornar todos los puestos cuando existen en la base de datos",async()=>{
            const ServicioEjemplo=[{
                
                    "codPuesto": 6,
                    "codParqueadero": 6,
                    "codTipoVehiculo": 1,
                    "detallePuesto": "ocupado"
                
            }];

            (pool.result as jest.Mock).mockResolvedValueOnce({
                rows: ServicioEjemplo,
                rowCount: 1,
            });

            const respuesta= await request(app).get("/api/puesto/getall");
            expect(respuesta.status).toBe(200);
            expect(Array.isArray(respuesta.body)).toBe(true);
            expect(respuesta.body).toEqual(ServicioEjemplo);

            
        })    
    })
    it("Debería crear un puesto cuando los datos son válidos", async () => {
        const nuevoPuesto = {
            CodParqueadero: 5,
            CodTipoVehiculo: 2,
            detallePuesto: "Joaaa",
        };
    
        const mockConsulta = {
            one: jest.fn()
                .mockResolvedValueOnce({ cantidad: 0 }) // Validación de que no existe
                .mockResolvedValueOnce({ codPuesto: 13 }), // Creación exitosa
            oneOrNone: jest.fn(),
            result: jest.fn()
        };
    
        (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
            return await callback(mockConsulta);
        });
    
        const respuesta = await request(app)
            .post("/api/puesto/add")
            .send(nuevoPuesto);
    
        console.log(respuesta.body); // Depuración adicional
    
        expect(respuesta.status).toBe(200);
        expect(respuesta.body).toEqual({
            objCreado: { codPuesto: 13 }
        });
    });
    

        it("Debería retornar un error si el puesto ya existe", async () => {
            const nuevoPuesto = {
                CodParqueadero: 5,
                CodTipoVehiculo: 2,
                detallePuesto: "Joaaa",
            };

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    one: jest.fn().mockResolvedValueOnce({ cantidad: 1 }),
                });
            });

            const respuesta = await request(app)
                .post("/api/puesto/add")
                .send(nuevoPuesto);

            expect(respuesta.status).toBe(400);
            expect(respuesta.body.respuesta).toBe("El puesto ya existe");
        });
    

    describe("DELETE api/puesto/delete/:codPuesto", () => {
        it("Debería eliminar un puesto cuando no tiene servicios relacionados", async () => {
            const puestoId = 11;

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    oneOrNone: jest.fn().mockResolvedValueOnce({ codPuesto: puestoId }),
                    any: jest.fn().mockResolvedValueOnce([]),
                    result: jest.fn().mockResolvedValueOnce({ rowCount: 1 }),
                });
            });

            const respuesta = await request(app).delete(`/api/puesto/delete/${puestoId}`);

            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toEqual({
                respuesta: "Se elimino Correctamente",
                "filas borradas": 1,
            });
        });

        it("Debería retornar un error si el puesto no existe", async () => {
            const puestoId = 11;
        
            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    oneOrNone: jest.fn().mockResolvedValueOnce({cantidad:0}),
                    any: jest.fn().mockResolvedValueOnce([]), 
                });
            });
        
            const respuesta = await request(app).delete(`/api/puesto/delete/${puestoId}`);
        
            expect(respuesta.status).toBe(400);
            expect(respuesta.body.respuesta).toBe("El puesto no existe");
        });

        it("Debería retornar un error si el puesto tiene servicios relacionados", async () => {
            const puestoId = 11;

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    oneOrNone: jest.fn().mockResolvedValueOnce({ codPuesto: puestoId }),
                    any: jest.fn().mockResolvedValueOnce([{ idServicio: 1 }]),
                });
            });

            const respuesta = await request(app).delete(`/api/puesto/delete/${puestoId}`);

            expect(respuesta.status).toBe(400);
            expect(respuesta.body.respuesta).toBe("El puesto tiene un servicio diario relacionado");
        });
    });

    describe("PUT api/puesto/update", () => {
        it("Debería actualizar un puesto cuando los datos son válidos", async () => {
            const puestoActualizado = {
                codPuesto: 10,
                CodParqueadero: 1,
                CodTipoVehiculo: 3,
                detallePuesto: "Nojoda",
            };

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    one: jest.fn().mockResolvedValueOnce({ cantidad: 1 }),
                    result: jest.fn().mockResolvedValueOnce({ rowCount: 1 }),
                });
            });

            const respuesta = await request(app)
                .put("/api/puesto/update")
                .send(puestoActualizado);

            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toHaveProperty("objActualizado");
        });

        it("Debería retornar un error si el puesto no existe", async () => {
            const puestoActualizado = {
                codPuesto: 10,
                CodParqueadero: 1,
                CodTipoVehiculo: 3,
                detallePuesto: "Nojoda",
            };

            (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
                return await callback({
                    one: jest.fn().mockResolvedValueOnce({ cantidad: 0 }),
                });
            });

            const respuesta = await request(app)
                .put("/api/puesto/update")
                .send(puestoActualizado);

            expect(respuesta.status).toBe(400);
            expect(respuesta.body.respuesta).toBe("El puesto no existe");
        });
    });  
})