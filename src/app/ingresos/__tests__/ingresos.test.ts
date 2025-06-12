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

describe("Pruebas Ingreso", () => {
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
   * PRUEBAS PARA OBTENER TODOS LOS INGRESOS
   *
   * Ruta: GET /api/ingreso/getAll
   * Descripción: Obtiene la lista de todos los ingresos registrados
   */
  describe("GET /api/ingreso/getall", () => {
    it("debe retornar todos los ingresos cuando existen en la base de datos", async () => {
      const accesosEjemplo = [
        {
          codUsuario: 25,
          fechaIngreso: "2025-05-02T05:00:00.000Z",
          horaIngreso: "13:20:20",
        },
      ];
      (pool.result as jest.Mock).mockResolvedValueOnce({
        rows: accesosEjemplo,
        rowCount: 1,
      });
      const respuesta = await request(app).get("/api/ingreso/getAll");
      expect(respuesta.status).toBe(200);
      expect(Array.isArray(respuesta.body)).toBe(true);
    });
    it("debe retornar un array vacío cuando no hay ingresos", async () => {
      (pool.result as jest.Mock).mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
      });

      const respuesta = await request(app).get("/api/ingreso/getAll");

      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toEqual([]);
    });
    it("debe retornar error cuando hay un problema en la base de datos", async () => {
      (pool.result as jest.Mock).mockRejectedValueOnce(
        new Error("Error de conexión a la base de datos")
      );
      const respuesta = await request(app).get("/api/ingreso/getAll");
      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toHaveProperty("Respuesta");
    });
  });
  /**
   * PRUEBAS PARA CREAR UN NUEVO INGRESO
   *
   * Ruta: POST /api/ingreso/add
   * Descripción: Crea un nuevo ingreso en el sistema
   */
  describe("POST /api/ingreso/add", () => {
    it("debe crear un nuevo ingreso exitosamente", async () => {
      const nuevoIngreso = {
        codUsuario: 25,
        fechaIngreso: "2025-07-09",
        horaIngreso: "13:20:21",
      };
      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 2,
        objGrabado: nuevoIngreso,
      });
      const respuesta = await request(app)
        .post("/api/ingreso/add")
        .send(nuevoIngreso);
      expect([200, 201]).toContain(respuesta.status);
      expect(respuesta.body).toHaveProperty("Respuesta");
      expect(respuesta.body.Respuesta).toBe("ingreso grabado");
      expect(respuesta.body).toHaveProperty("objGrabado");
      expect(respuesta.body.objGrabado).toMatchObject(nuevoIngreso);
    });
    it("debe retornar error cuando ya existe un acceso con la misma fecha y hora", async () => {
      const ingresoDuplicado = {
        codUsuario: 25,
        fechaIngreso: "2025-07-09",
        horaIngreso: "13:20:21",
      };

      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 1,
        Respuesta: "Error al grabar ya existe",
      });

      const respuesta = await request(app)
        .post("/api/ingreso/add")
        .send(ingresoDuplicado);

      expect([400, 404]).toContain(respuesta.status);
      expect(respuesta.body).toHaveProperty("Respuesta");
      expect(respuesta.body.Respuesta).toBe("Error al grabar ya existe");
    });
    it("debe retornar error cuando no existe el usuario (error 23503)", async () => {
      const error23503 = new Error("Foreign key violation");
      (error23503 as any).code = "23503";

      (pool.task as jest.Mock).mockRejectedValueOnce(error23503);

      const respuesta = await request(app).post("/api/ingreso/add").send({
        codUsuario: 9999,
        fechaIngreso: "2025-07-09",
        horaIngreso: "13:20:21",
      });

      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toHaveProperty("Respuesta");
      expect(respuesta.body.Respuesta).toContain("no existe el usuarion");
    });

    it("debe retornar error genérico cuando ocurre otro error", async () => {
      const errorGen = new Error("Error inesperado");
      (pool.task as jest.Mock).mockRejectedValueOnce(errorGen);

      const respuesta = await request(app).post("/api/ingreso/add").send({
        codUsuario: 25,
        fechaIngreso: "2025-07-09",
        horaIngreso: "13:20:21",
      });

      expect(respuesta.status).toBe(500);
      expect(respuesta.body).toHaveProperty("Respuesta", "Algo salio mal");
    });
    it("debe retornar errores de validación cuando faltan datos o son inválidos", async () => {
      const ingresoInvalido = {
        codUsuario: "noEsNumero", // campo inválido (string en vez de número)
        fechaIngreso: "2025-13-40", // fecha inválida
        // falta horaIngreso
      };

      const respuesta = await request(app)
        .post("/api/ingreso/add")
        .send(ingresoInvalido);

      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toHaveProperty("respuesta");
      expect(Array.isArray(respuesta.body.respuesta)).toBe(true);

      const errores = respuesta.body.respuesta;

      // Validar que existan errores para cada campo
      expect(errores).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: "codUsuario",
            msg: expect.stringMatching(/obligatorio|numérico/),
          }),
          expect.objectContaining({
            path: "fechaIngreso",
            msg: expect.stringContaining("formato"),
          }),
          expect.objectContaining({
            path: "horaIngreso",
            msg: expect.stringContaining("obligatoria"),
          }),
        ])
      );
    });
    it("debe retornar error cuando falla la base de datos durante la creación", async () => {
      (pool.task as jest.Mock).mockRejectedValueOnce(
        new Error("Error de inserción")
      );

      const respuesta = await request(app).post("/api/ingreso/add").send({
        codUsuario: 1,
        fechaIngreso: "2025-07-09",
        horaIngreso: "13:20:21",
      });

      expect([400, 500]).toContain(respuesta.status);
      expect(respuesta.body).toHaveProperty("Respuesta");
      expect(respuesta.body.Respuesta).toBe("Algo salio mal");
    });
  });
  /**
   * PRUEBAS PARA ACTUALIZAR UN ACCESO
   *
   * Ruta: PUT /api/acceso/update
   * Descripción: Actualiza los datos de un acceso existente
   */
  describe("PUT /api/ingreso/update", () => {
    it("debe actualizar un ingreso exitosamente", async () => {
      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 2,
        objActualizado: { rowCount: 1 },
      });

      const respuesta = await request(app).put("/api/ingreso/update").send({
        codIngreso: 1,
        codUsuario: 2,
        fechaIngreso: "2025-05-24",
        horaIngreso: "12:00:00",
      });

      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toHaveProperty("Respuesta", "Actualizado");
      expect(respuesta.body).toHaveProperty("Detalle", 1);
    });
    it("debe retornar error cuando ya existe un ingreso con la misma fecha y hora", async () => {
      (pool.task as jest.Mock).mockResolvedValueOnce({ caso: 1 });

      const respuesta = await request(app).put("/api/ingreso/update").send({
        codIngreso: 1,
        codUsuario: 2,
        fechaIngreso: "2025-05-24",
        horaIngreso: "12:00:00",
      });

      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toHaveProperty("Respuesta", "ya existe");
    });
    it("debe retornar error 404 si no se encuentra el ingreso a actualizar", async () => {
      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 2,
        objActualizado: { rowCount: 0 },
      });

      const respuesta = await request(app).put("/api/ingreso/update").send({
        codIngreso: 999,
        codUsuario: 2,
        fechaIngreso: "2025-05-24",
        horaIngreso: "12:00:00",
      });

      expect(respuesta.status).toBe(404);
      expect(respuesta.body).toHaveProperty(
        "Respuesta",
        "No se encontró el ingreso a actualizar"
      );
    });
    it("debe retornar error cuando falla la base de datos durante la actualización", async () => {
      (pool.task as jest.Mock).mockRejectedValueOnce(
        new Error("Error de actualización")
      );

      const respuesta = await request(app).put("/api/ingreso/update").send({
        codIngreso: 1,
        codUsuario: 2,
        fechaIngreso: "2025-05-24",
        horaIngreso: "12:00:00",
      });

      expect([400, 500]).toContain(respuesta.status);
      expect(respuesta.body).toHaveProperty("Respuesta");
    });
    it("debe retornar error cuando el usuario no existe (error 23503)", async () => {
      // Simulamos error de clave foránea
      (pool.task as jest.Mock).mockRejectedValueOnce({
        code: "23503",
      });

      const respuesta = await request(app).put("/api/ingreso/update").send({
        codIngreso: 1,
        codUsuario: 9999, // Usuario que no existe
        fechaIngreso: "2025-05-24",
        horaIngreso: "10:00:00",
      });

      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toHaveProperty(
        "Respuesta",
        "No existe el usuario 9999"
      );
    });
    it("debe retornar errores de validación cuando faltan datos o son inválidos", async () => {
      const respuesta = await request(app).put("/api/ingreso/update").send({}); // cuerpo vacío

      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toHaveProperty("respuesta");
      expect(Array.isArray(respuesta.body.respuesta)).toBe(true);

      const camposEsperados = [
        "codIngreso",
        "codUsuario",
        "fechaIngreso",
        "horaIngreso",
      ];
      const errores = respuesta.body.respuesta;

      for (const campo of camposEsperados) {
        const error = errores.find((e: any) => e.path === campo);
        expect(error).toBeDefined();
        expect(error).toHaveProperty("msg");
        expect(error).toHaveProperty("location", "body");
        expect(error.type).toBe("field");
      }
    });

    it("debe retornar error cuando falla la base de datos durante la actualización", async () => {
      // Simulamos un error genérico en la base de datos
      (pool.task as jest.Mock).mockRejectedValueOnce(
        new Error("Error inesperado en la base de datos")
      );

      const respuesta = await request(app).put("/api/ingreso/update").send({
        codIngreso: 1,
        codUsuario: 1,
        fechaIngreso: "2025-05-24",
        horaIngreso: "10:00:00",
      });

      expect([400, 500]).toContain(respuesta.status);
      expect(respuesta.body).toHaveProperty("Respuesta", "Algo salió mal");
    });
  });
  /**
   * PRUEBAS PARA ELIMINAR UN INGRESO
   *
   * Ruta: DELETE /api/ingreso/delete/:codIngreso
   * Descripción: Elimina un ingreso existente según su ID de ingreso
   */
  describe("DELETE /api/ingreso/delete/:codIngreso", () => {
    it("debe eliminar un ingreso exitosamente", async () => {
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

      // Asumiendo que la ruta es algo como DELETE /api/ingreso/delete/:codIngreso
      const codIngreso = 123; // cambia según el caso

      const respuesta = await request(app).delete(
        `/api/ingreso/delete/${codIngreso}`
      );

      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toHaveProperty("respuesta", "Ya lo borré");
      expect(respuesta.body).toHaveProperty("filas_borradas", 1);
    });
    it("debe retornar error cuando el ingreso no existe", async () => {
      const mockClient = {
        query: jest.fn(),
        oneOrNone: jest.fn(),
        one: jest.fn(),
        result: jest.fn(),
      };

      (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
        return callback(mockClient);
      });

      // Simulamos que no se encontró el ingreso para borrar (null)
      mockClient.result.mockResolvedValueOnce({ rowCount: 0 });

      const codIngreso = 999;

      const respuesta = await request(app).delete(
        `/api/ingreso/delete/${codIngreso}`
      );

      expect(respuesta.status).toBe(404);
      expect(respuesta.body).toHaveProperty(
        "respuesta",
        "No se encontró el ingreso para borrar"
      );
    });
    it("debe manejar errores de base de datos durante la eliminación", async () => {
      const mockClient = {
        query: jest.fn(),
        oneOrNone: jest.fn(),
        one: jest.fn(),
        result: jest.fn(),
      };

      (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
        // El callback (task) lanzará error simulando fallo en base de datos
        return callback(mockClient);
      });

      // Simulamos que al ejecutar result ocurre un error (reject)
      mockClient.result.mockRejectedValueOnce(
        new Error("Error de eliminación")
      );

      const respuesta = await request(app).delete("/api/ingreso/delete/1");

      expect(respuesta.status).toBe(500);
      expect(respuesta.body).toHaveProperty("respuesta", "Error eliminando");
      expect(respuesta.body).toHaveProperty("respuesta", expect.any(String)); // si agregas el mensaje de error
    });
  });
});
