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
describe("Pruebas Servicios Otros", () => {
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
   * PRUEBAS PARA OBTENER TODOS LOS  SERVICIOS OTROS
   *
   * Ruta: GET /api/Sotro/getAll
   * Descripción: Obtiene la lista de todos los servicios ingresos otro registrados
   */
  describe("GET /api/Sotro/getAll", () => {
    it("debe retornar todos los servicios otros cuando existen en la base de datos", async () => {
      const Ejemplo = [
        {
          codIngresoServicioOtro: 5,
          codServicioOtro: 16,
          codPuesto: 2,
          fechaIngresoServicioOtro: "2025-01-17T05:00:00.000Z",
          fechaSalidaServicioOtro: "2025-03-21T05:00:00.000Z",
        },
      ];
      (pool.result as jest.Mock).mockResolvedValueOnce({
        rows: Ejemplo,
        rowCount: 1,
      });
      const respuesta = await request(app).get("/api/Sotro/getAll");
      expect(respuesta.status).toBe(200);
      expect(Array.isArray(respuesta.body)).toBe(true);
    });
    it("debe retornar un array vacío cuando no hay servicios  otros ", async () => {
      (pool.result as jest.Mock).mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
      });

      const respuesta = await request(app).get("/api/Sotro/getAll");

      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toEqual([]);
    });
    it("debe retornar error cuando hay un problema en la base de datos", async () => {
      (pool.result as jest.Mock).mockRejectedValueOnce(
        new Error("Error de conexión a la base de datos")
      );
      const respuesta = await request(app).get("/api/Sotro/getAll");
      expect(respuesta.status).toBe(500);
      expect(respuesta.body).toHaveProperty("Respuesta");
    });
  });
  /**
   * PRUEBAS PARA CREAR UN NUEVO SERVICIO OTRO
   *
   * Ruta: POST /api/Sotro/add
   * Descripción: Crea un nuevo serviocios otros en el sistema
   */
  describe("POST /api/Sotro/add", () => {
    it("debe crear un nuevo ingreso servicio otro exitosamente", async () => {
      const nuevo = {
        codServicioOtro: 16,
        codParqueadero: 1,
        codVehiculo: 1,
        fechaPagoServicioOtro: "2025-01-21",
        fechaInicioServicioOtro: "2025-08-18",
        fechaFinServicioOtro: "2025-04-15",
        valorServicioOtro: "20000000.00",
      };
      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 2,
        objGrabado: nuevo,
      });
      const respuesta = await request(app).post("/api/Sotro/add").send(nuevo);
      expect([200, 201]).toContain(respuesta.status);

      expect(respuesta.body).toHaveProperty("codServicioOtro");
      expect(typeof respuesta.body.codServicioOtro).toBe("number");
      expect(respuesta.body.codServicioOtro).toBeGreaterThan(0);
    });
    it("debe retornar error cuando ya existe un servicio otro", async () => {
      const ingresoDuplicado = {
        codServicioOtro: 16,
        codParqueadero: 1,
        codVehiculo: 1,
        fechaPagoServicioOtro: "2025-01-21",
        fechaInicioServicioOtro: "2025-08-18",
        fechaFinServicioOtro: "2025-04-15",
        valorServicioOtro: "20000000.00",
      };

      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 1,
        Respuesta: "Error al grabar ya existe",
      });

      const respuesta = await request(app)
        .post("/api/Sotro/add")
        .send(ingresoDuplicado);

      expect([400, 404]).toContain(respuesta.status);
      expect(respuesta.body).toHaveProperty("Respuesta");
      expect(respuesta.body.Respuesta).toBe("Error al grabar ya existe");
    });
    it("debe retornar error cuando cuando existe una clave foranea (error 23503)", async () => {
      const error23503 = new Error("Foreign key violation");
      (error23503 as any).code = "23503";

      (pool.task as jest.Mock).mockRejectedValueOnce(error23503);

      const respuesta = await request(app).post("/api/Sotro/add").send({
        codServicioOtro: 99,
        codParqueadero: 99,
        codVehiculo: 99,
        fechaPagoServicioOtro: "2025-01-21",
        fechaInicioServicioOtro: "2025-08-18",
        fechaFinServicioOtro: "2025-04-15",
        valorServicioOtro: "20000000.00",
      });

      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toHaveProperty("Respuesta");
      expect(respuesta.body.Respuesta).toContain(
        "Alguna clave foránea no existe"
      );
    });
    it("debe manejar errores de base de datos durante la creación", async () => {
      const errorGen = new Error("Error inesperado");
      (pool.task as jest.Mock).mockRejectedValueOnce(errorGen);

      const respuesta = await request(app).post("/api/Sotro/add").send({
        codServicioOtrclearo: 1,
        codParqueadero: 8,
        codVehiculo: 6,
        fechaPagoServicioOtro: "2025-01-21",
        fechaInicioServicioOtro: "2025-08-18",
        fechaFinServicioOtro: "2025-04-15",
        valorServicioOtro: "20000000.00",
      });

      expect(respuesta.status).toBe(500);
      expect(respuesta.body).toHaveProperty("Respuesta", "Algo salio mal");
    });
    it("debe retornar errores de validación cuando faltan datos o son inválidos", async () => {
      const ingresoInvalido = {}; // Enviamos un body vacío para forzar todos los errores

      const respuesta = await request(app)
        .post("/api/Sotro/add")
        .send(ingresoInvalido);

      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toHaveProperty("respuesta");
      expect(Array.isArray(respuesta.body.respuesta)).toBe(true);

      const errores = respuesta.body.respuesta;

      expect(errores).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: "codParqueadero",
            msg: "El código del parqueadero es obligatorio",
          }),
          expect.objectContaining({
            path: "codVehiculo",
            msg: "El código del vehículo es obligatorio",
          }),
          expect.objectContaining({
            path: "fechaPagoServicioOtro",
            msg: "La fecha de pago del servicio es obligatoria",
          }),
          expect.objectContaining({
            path: "fechaInicioServicioOtro",
            msg: "La fecha de inicio del servicio es obligatoria",
          }),
          expect.objectContaining({
            path: "fechaFinServicioOtro",
            msg: "La fecha de fin del servicio es obligatoria",
          }),
          expect.objectContaining({
            path: "valorServicioOtro",
            msg: "El valor del servicio es obligatorio",
          }),
        ])
      );
    });
  });
  /**
   * PRUEBAS PARA ACTUALIZAR UN SERVICIO OTRO
   *
   * Ruta: PUT /api/Sotro/update
   * Descripción: Actualiza los datos de un servicio  otro existente
   */
  describe("PUT /api/Sotro/update", () => {
    it("debe actualizar un ingreso servicio otro exitosamente", async () => {
      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 2,
        objActualizado: { rowCount: 1 },
      });

      const respuesta = await request(app).put("/api/Sotro/update").send({
        codServicioOtro: 2,
        codParqueadero: 1,
        codVehiculo: 1,
        fechaPagoServicioOtro: "2025-01-21",
        fechaInicioServicioOtro: "2029-08-22",
        fechaFinServicioOtro: "2025-04-15",
        valorServicioOtro: "20000000.00",
      });

      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toHaveProperty("Respuesta", "Actualizado");
      expect(respuesta.body).toHaveProperty("Detalle", 1);
    });
    it("debe retornar error cuando ya existe un  servico otro  ", async () => {
      (pool.task as jest.Mock).mockResolvedValueOnce({ caso: 1 });

      const respuesta = await request(app).put("/api/Sotro/update").send({
        codServicioOtro: 2,
        codParqueadero: 1,
        codVehiculo: 1,
        fechaPagoServicioOtro: "2025-01-21",
        fechaInicioServicioOtro: "2029-08-22",
        fechaFinServicioOtro: "2025-04-15",
        valorServicioOtro: "20000000.00",
      });

      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toHaveProperty("Respuesta", "ya existe");
    });
    it("debe retornar error 404 si no se encuentra el servicio otro a actualizar", async () => {
      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 2,
        objActualizado: { rowCount: 0 },
      });

      const respuesta = await request(app).put("/api/Sotro/update").send({
        codServicioOtro: 888,
        codParqueadero: 1,
        codVehiculo: 1,
        fechaPagoServicioOtro: "2025-01-21",
        fechaInicioServicioOtro: "2029-08-22",
        fechaFinServicioOtro: "2025-04-15",
        valorServicioOtro: "20000000.00",
      });

      expect(respuesta.status).toBe(404);
      expect(respuesta.body).toHaveProperty(
        "Respuesta",
        "No se encontró el servicio otro a actualizar"
      );
    });
    it("debe retornar errores de validación cuando los datos son inválidos", async () => {
      const datosInvalidos = {
        codServicioOtro: 16,
        codParqueadero: "", // <-- debería ser numérico
        codVehiculo: 1,
        fechaPagoServicioOtro: "202011", // <-- inválido
        fechaInicioServicioOtro: "20-08-22", // <-- inválido
        fechaFinServicioOtro: "2025-05-15",
        valorServicioOtro: "20000000.00",
      };

      const respuesta = await request(app)
        .put("/api/Sotro/update")
        .send(datosInvalidos);

      expect(respuesta.status).toBe(400); // <-- no debería ser 500
      expect(respuesta.body).toHaveProperty("respuesta");
      expect(Array.isArray(respuesta.body.respuesta)).toBe(true);

      const errores = respuesta.body.respuesta;

      const camposEsperados = [
        {
          path: "codParqueadero",
          msg: "El código del parqueadero es obligatorio",
        },
        {
          path: "codParqueadero",
          msg: "El código del parqueadero debe ser numérico",
        },
        {
          path: "fechaPagoServicioOtro",
          msg: "La fecha de pago del servicio debe ser una fecha válida: AAAA-MM-DD",
        },
        {
          path: "fechaInicioServicioOtro",
          msg: "La fecha de inicio del servicio debe ser una fecha válida: AAAA-MM-DD",
        },
      ];

      for (const campo of camposEsperados) {
        const error = errores.find(
          (e: any) => e.path === campo.path && e.msg === campo.msg
        );
        expect(error).toBeDefined();
        expect(error).toHaveProperty("location", "body");
        expect(error).toHaveProperty("type", "field");
      }
    });
    it("debe retornar error cuando falla la base de datos durante la actualización", async () => {
      // Simulamos un error genérico en la base de datos
      (pool.task as jest.Mock).mockRejectedValueOnce(
        new Error("Error inesperado en la base de datos")
      );

      const respuesta = await request(app).put("/api/Sotro/update").send({
        codServicioOtro: 888,
        codParqueadero: 1,
        codVehiculo: 1,
        fechaPagoServicioOtro: "2025-01-21",
        fechaInicioServicioOtro: "2029-08-22",
        fechaFinServicioOtro: "2025-04-15",
        valorServicioOtro: "20000000.00",
      });

      expect([400, 500]).toContain(respuesta.status);
      expect(respuesta.body).toHaveProperty("Respuesta", "Algo salió mal");
    });
  });
  /**
   * PRUEBAS PARA ELIMINAR UN SERVICIO OTRO
   *
   * Ruta: DELETE /api/ingreso/delete/:codServicioOtro
   * Descripción: Elimina un  servicio otro existente según su ID de ingreso
   */
  describe("DELETE /api/Sotro/delete/:codServicioOtro", () => {
    it("debe eliminar un  servicio otro exitosamente", async () => {
      const mockClient = {
        query: jest.fn(),
        oneOrNone: jest.fn(),
        one: jest.fn(),
        result: jest.fn(),
      };

      (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
        return callback(mockClient);
      });

      // Mockear el resultado del borrado: fila afectada
      mockClient.result.mockResolvedValueOnce({ rowCount: 1 });

      const codServicioOtro = 123;

      const respuesta = await request(app).delete(
        `/api/Sotro/delete/${codServicioOtro}`
      );

      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toHaveProperty("Respuesta", "Eliminado");
      expect(respuesta.body).toHaveProperty("Filas borradas", 1);
    });
    it("debe retornar error cuando el ingreso servicio otros no existe", async () => {
      const mockClient = {
        query: jest.fn(),
        oneOrNone: jest.fn(),
        one: jest.fn(),
        result: jest.fn(),
      };

      (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
        return callback(mockClient);
      });

      // Simulamos que no se encontró el ingreso para borrar (rowCount = 0)
      mockClient.result.mockResolvedValueOnce({ rowCount: 0 });

      const codServicioOtro = 999;

      const respuesta = await request(app).delete(
        `/api/Sotro/delete/${codServicioOtro}`
      );

      expect(respuesta.status).toBe(404);
      expect(respuesta.body).toHaveProperty("Respuesta", "Dato no encontrado");
    });
    it("debe retornar error de validación si no se proporciona el ID", async () => {
      const respuesta = await request(app).delete("/api/Sotro/delete/");

      expect(respuesta.status).toBe(400); // Código típico para errores de validación
      expect(respuesta.body).toHaveProperty("respuesta");
      expect(Array.isArray(respuesta.body.respuesta)).toBe(true);
      expect(respuesta.body.respuesta[0]).toMatchObject({
        type: "field",
        msg: "El código del servicio es obligatorio y debe ser numérico",
        path: "codServicioOtro",
      });
    });
    it("debe manejar errores de base de datos durante la eliminación", async () => {
      const mockClient = {
        query: jest.fn(),
        oneOrNone: jest.fn(),
        one: jest.fn(),
        result: jest.fn(),
      };

      (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
        return callback(mockClient);
      });

      // Simulamos error en la llamada a result
      mockClient.result.mockRejectedValueOnce(
        new Error("Error de eliminación")
      );

      const respuesta = await request(app).delete("/api/Sotro/delete/1");

      expect(respuesta.status).toBe(500);
      expect(respuesta.body).toHaveProperty("Respuesta", "Algo salio mal");
      expect(respuesta.body).toHaveProperty("Respuesta", expect.any(String));
    });
  });
});
