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

describe("Pruebas Servicios Diarios", () => {
  let app: express.Application;

  beforeAll(() => {
    // Inicializamos la aplicación para las pruebas
    const servidor = new Servidor();
    app = servidor.app;
  });

  afterEach(() => {
    // Limpiamos los mocks después de cada prueba
    jest.clearAllMocks();
  });

  /**
   * PRUEBAS PARA OBTENER TODOS LOS SERVICIOS DIARIOS
   *
   * Ruta: GET /api/Sdiario/getall
   * Descripción: Obtiene la lista de todos los servicios diarios registrados
   */
  describe("GET /api/Sdiario/getall", () => {
    it("debe retornar todos los servicios diarios cuando existen en la base de datos", async () => {
      const serviciosEjemplo = [
        {
          cod_servicio_diario: 1,
          cod_parqueadero: 1,
          cod_vehiculo: 1,
          cod_puesto: 1,
          fecha_inicio: "2024-03-20T00:00:00.000Z",
          fecha_fin: "2024-03-20T00:00:00.000Z",
          valor_diario: 15000
        }
      ];
      (pool.result as jest.Mock).mockResolvedValueOnce({
        rows: serviciosEjemplo,
        rowCount: 1,
      });
      const respuesta = await request(app).get("/api/Sdiario/getall");
      expect(respuesta.status).toBe(200);
      expect(Array.isArray(respuesta.body)).toBe(true);
      expect(respuesta.body).toEqual(serviciosEjemplo);
    });

    it("debe retornar error cuando hay un problema en la base de datos", async () => {
      (pool.result as jest.Mock).mockRejectedValueOnce(
        new Error("Error de conexión a la base de datos")
      );
      const respuesta = await request(app).get("/api/Sdiario/getall");
      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toHaveProperty("respuesta", "Coño e la madre");
    });
  });

  /**
   * PRUEBAS PARA CREAR UN NUEVO SERVICIO DIARIO
   *
   * Ruta: POST /api/Sdiario/add
   * Descripción: Crea un nuevo servicio diario en el sistema
   */
  describe("POST /api/Sdiario/add", () => {
    it("debe crear un nuevo servicio diario exitosamente", async () => {
      const nuevoServicio = {
        CodParqueadero: 1,
        CodVehiculo: 1,
        CodPuesto: 1,
        FechaInicio: "2024-03-20",
        FechaFin: "2024-03-20",
        ValorDiario: 15000,
      };

      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 2,
        objCreado: {
          cod_servicio_diario: 1,
          cod_parqueadero: 1,
          cod_vehiculo: 1,
          cod_puesto: 1,
          fecha_inicio: "2024-03-20",
          fecha_fin: "2024-03-20",
          valor_diario: 15000
        }
      });

      const response = await request(app)
        .post("/api/Sdiario/add")
        .send(nuevoServicio);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("objCreado");
    });

    it("debe retornar error cuando el vehículo no existe", async () => {
      const servicioConVehiculoInexistente = {
        CodParqueadero: 1,
        CodVehiculo: 999,
        CodPuesto: 1,
        FechaInicio: "2024-03-20",
        FechaFin: "2024-03-20",
        ValorDiario: 15000,
      };

      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 3,
        objCreado: null
      });

      const response = await request(app)
        .post("/api/Sdiario/add")
        .send(servicioConVehiculoInexistente);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("respuesta", "El vehículo no existe en la base de datos");
    });

    it("debe retornar error cuando el parqueadero no existe", async () => {
      const servicioConParqueaderoInexistente = {
        CodParqueadero: 999,
        CodVehiculo: 1,
        CodPuesto: 1,
        FechaInicio: "2024-03-20",
        FechaFin: "2024-03-20",
        ValorDiario: 15000,
      };

      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 4,
        objCreado: null
      });

      const response = await request(app)
        .post("/api/Sdiario/add")
        .send(servicioConParqueaderoInexistente);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("respuesta", "El parqueadero no existe en la base de datos");
    });

    it("debe retornar error cuando el puesto no existe", async () => {
      const servicioConPuestoInexistente = {
        CodParqueadero: 1,
        CodVehiculo: 1,
        CodPuesto: 999,
        FechaInicio: "2024-03-20",
        FechaFin: "2024-03-20",
        ValorDiario: 15000,
      };

      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 5,
        objCreado: null
      });

      const response = await request(app)
        .post("/api/Sdiario/add")
        .send(servicioConPuestoInexistente);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("respuesta", "El puesto no existe o no pertenece al parqueadero especificado");
    });
  });

  /**
   * PRUEBAS PARA ACTUALIZAR UN SERVICIO DIARIO
   *
   * Ruta: PUT /api/Sdiario/update
   * Descripción: Actualiza los datos de un servicio diario existente
   */
  describe("PUT /api/Sdiario/update", () => {
    it("debe actualizar un servicio diario exitosamente", async () => {
      const servicioActualizado = {
        CodServicioDiarios: 1,
        CodParqueadero: 1,
        CodVehiculo: 1,
        CodPuesto: 1,
        FechaInicio: "2024-03-21",
        FechaFin: "2024-03-21",
        ValorDiario: 20000,
      };

      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 2,
        objCre: {
          rowCount: 1
        }
      });

      const response = await request(app)
        .put("/api/Sdiario/update")
        .send(servicioActualizado);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("objCre");
    });

    it("debe retornar error cuando el servicio no existe", async () => {
      const servicioInexistente = {
        CodServicioDiarios: 999,
        CodParqueadero: 1,
        CodVehiculo: 1,
        CodPuesto: 1,
        FechaInicio: "2024-03-20",
        FechaFin: "2024-03-20",
        ValorDiario: 15000,
      };

      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 1,
        objCre: null
      });

      const response = await request(app)
        .put("/api/Sdiario/update")
        .send(servicioInexistente);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("respuesta", "Vale mia eso ya esta");
    });

    it("debe retornar error cuando el vehículo no existe", async () => {
      const servicioConVehiculoInexistente = {
        CodServicioDiarios: 1,
        CodParqueadero: 1,
        CodVehiculo: 999,
        CodPuesto: 1,
        FechaInicio: "2024-03-20",
        FechaFin: "2024-03-20",
        ValorDiario: 15000,
      };

      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 3,
        objCre: null
      });

      const response = await request(app)
        .put("/api/Sdiario/update")
        .send(servicioConVehiculoInexistente);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("respuesta", "El vehículo no existe en la base de datos");
    });

    it("debe retornar error cuando el parqueadero no existe", async () => {
      const servicioConParqueaderoInexistente = {
        CodServicioDiarios: 1,
        CodParqueadero: 999,
        CodVehiculo: 1,
        CodPuesto: 1,
        FechaInicio: "2024-03-20",
        FechaFin: "2024-03-20",
        ValorDiario: 15000,
      };

      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 4,
        objCre: null
      });

      const response = await request(app)
        .put("/api/Sdiario/update")
        .send(servicioConParqueaderoInexistente);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("respuesta", "El parqueadero no existe en la base de datos");
    });

    it("debe retornar error cuando el puesto no existe", async () => {
      const servicioConPuestoInexistente = {
        CodServicioDiarios: 1,
        CodParqueadero: 1,
        CodVehiculo: 1,
        CodPuesto: 999,
        FechaInicio: "2024-03-20",
        FechaFin: "2024-03-20",
        ValorDiario: 15000,
      };

      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 5,
        objCre: null
      });

      const response = await request(app)
        .put("/api/Sdiario/update")
        .send(servicioConPuestoInexistente);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("respuesta", "El puesto no existe o no pertenece al parqueadero especificado");
    });
  });

  /**
   * PRUEBAS PARA ELIMINAR UN SERVICIO DIARIO
   *
   * Ruta: DELETE /api/Sdiario/delete/:codServicio
   * Descripción: Elimina un servicio diario existente según su ID
   */
  describe("DELETE /api/Sdiario/delete/:codServicio", () => {
    it("debe eliminar un servicio diario exitosamente", async () => {
      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 2,
        Objeliminado: {
          rowCount: 1
        }
      });

      const response = await request(app)
        .delete("/api/Sdiario/delete/1");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("respuesta", "Se elimino Correctamente");
      expect(response.body).toHaveProperty("filas borradas", 1);
    });

    it("debe retornar error cuando el servicio no existe", async () => {
      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 1,
        Objeliminado: null
      });

      const response = await request(app)
        .delete("/api/Sdiario/delete/999");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("respuesta", "El servicio diario no existe");
    });
  });
}); 