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
describe("Pruebas Ingreso Servicios Otros", () => {
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
   * PRUEBAS PARA OBTENER TODOS LOS  INGRESOS SERVICIOS  OTROS
   *
   * Ruta: GET /api/Isotro/getAll
   * Descripción: Obtiene la lista de todos los ingresos servicios  otro registrados
   */
  describe("GET /api/Isotro/getAll", () => {
    it("debe retornar todos los ingresos servicios otros cuando existen en la base de datos", async () => {
      const accesosEjemplo = [
        {
          codIngresoServicioOtro: 5,
          codServicioOtro: 16,
          codPuesto: 2,
          fechaIngresoServicioOtro: "2025-01-17T05:00:00.000Z",
          fechaSalidaServicioOtro: "2025-03-21T05:00:00.000Z",
        },
      ];
      (pool.result as jest.Mock).mockResolvedValueOnce({
        rows: accesosEjemplo,
        rowCount: 1,
      });
      const respuesta = await request(app).get("/api/Isotro/getAll");
      expect(respuesta.status).toBe(200);
      expect(Array.isArray(respuesta.body)).toBe(true);
    });
    it("debe retornar un array vacío cuando no hay ingresos servicios  otros ", async () => {
      (pool.result as jest.Mock).mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
      });

      const respuesta = await request(app).get("/api/Isotro/getAll");

      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toEqual([]);
    });
    it("debe retornar error cuando hay un problema en la base de datos", async () => {
      (pool.result as jest.Mock).mockRejectedValueOnce(
        new Error("Error de conexión a la base de datos")
      );
      const respuesta = await request(app).get("/api/Isotro/getAll");
      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toHaveProperty("Respuesta");
    });
  });
  /**
   * PRUEBAS PARA CREAR UN NUEVO INGRESO SERVICIO OTRO
   *
   * Ruta: POST /api/Isotro/add
   * Descripción: Crea un nuevo  ingresos serviocios otros en el sistema
   */
  describe("POST /api/Isotro/add", () => {
    it("debe crear un nuevo ingreso servicio otro exitosamente", async () => {
      const nuevoIngreso = {
        codIngresoServicioOtro: 5,
        codServicioOtro: 16,
        codPuesto: 2,
        fechaIngresoServicioOtro: "2025-01-17",
        fechaSalidaServicioOtro: "2025-03-21",
      };
      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 2,
        objGrabado: nuevoIngreso,
      });
      const respuesta = await request(app)
        .post("/api/Isotro/add")
        .send(nuevoIngreso);
      expect([200, 201]).toContain(respuesta.status);
      expect(respuesta.body).toHaveProperty("Respuesta");

      expect(respuesta.body).toHaveProperty("objGrabado");
      expect(respuesta.body.objGrabado).toMatchObject(nuevoIngreso);
    });
    it("debe retornar error cuando ya existe un ingreso servicio otro con la misma fecha de entrada  y salida", async () => {
      const ingresoDuplicado = {
        codIngresoServicioOtro: 5,
        codServicioOtro: 16,
        codPuesto: 2,
        fechaIngresoServicioOtro: "2025-01-17",
        fechaSalidaServicioOtro: "2025-03-21",
      };

      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 1,
        Respuesta: "Error al grabar ya existe",
      });

      const respuesta = await request(app)
        .post("/api/Isotro/add")
        .send(ingresoDuplicado);

      expect([400, 404]).toContain(respuesta.status);
      expect(respuesta.body).toHaveProperty("Respuesta");
      expect(respuesta.body.Respuesta).toBe("Error al grabar ya existe");
    });
    it("debe retornar error cuando cuando existe una clave foranea (error 23503)", async () => {
      const error23503 = new Error("Foreign key violation");
      (error23503 as any).code = "23503";

      (pool.task as jest.Mock).mockRejectedValueOnce(error23503);

      const respuesta = await request(app).post("/api/Isotro/add").send({
        codIngresoServicioOtro: 9999,
        codServicioOtro: 16,
        codPuesto: 2,
        fechaIngresoServicioOtro: "2025-01-17",
        fechaSalidaServicioOtro: "2025-03-21",
      });

      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toHaveProperty("Respuesta");
      expect(respuesta.body.Respuesta).toContain(
        "Alguna clave foránea no existe"
      );
    });

    it("debe retornar errores de validación cuando faltan datos o son inválidos", async () => {
      const ingresoInvalido = {
        codIngresoServicioOtro: 5,
        codServicioOtro: "",
        codPuesto: 2,
        fechaIngresoServicioOtro: "",
        fechaSalidaServicioOtro: "2025-",
      };

      const respuesta = await request(app)
        .post("/api/Isotro/add")
        .send(ingresoInvalido);

      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toHaveProperty("respuesta");
      expect(Array.isArray(respuesta.body.respuesta)).toBe(true);

      const errores = respuesta.body.respuesta;

      // Validar que existan errores para cada campo

      expect(errores).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: "codServicioOtro",
            msg: expect.stringMatching(/obligatorio|numérico/),
          }),
          expect.objectContaining({
            path: "fechaIngresoServicioOtro",
            msg: expect.stringContaining("obligatoria"),
          }),
          expect.objectContaining({
            path: "fechaSalidaServicioOtro",
            msg: expect.stringContaining("formato"),
          }),
        ])
      );
    });
    it("debe retornar error cuando falla la base de datos durante la creación", async () => {
      (pool.task as jest.Mock).mockRejectedValueOnce(
        new Error("Error de inserción")
      );

      const respuesta = await request(app).post("/api/Isotro/add").send({
        codIngresoServicioOtro: 5,
        codServicioOtro: 16,
        codPuesto: 1,
        fechaIngresoServicioOtro: "2025-01-17",
        fechaSalidaServicioOtro: "2025-03-21",
      });

      expect([400, 500]).toContain(respuesta.status);
      expect(respuesta.body).toHaveProperty("Respuesta");
      expect(respuesta.body.Respuesta).toBe("Algo salio mal");
    });
  });
  /**
   * PRUEBAS PARA ACTUALIZAR UN  INGRESO SERVICIO  OTRO
   *
   * Ruta: PUT /api/Isotro/update
   * Descripción: Actualiza los datos de un servico ingreso otro existente
   */
  describe("PUT /api/Isotro/update", () => {
    it("debe actualizar un ingreso servicio otro exitosamente", async () => {
      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 2,
        objActualizado: { rowCount: 1 },
      });

      const respuesta = await request(app).put("/api/Isotro/update").send({
        codIngresoServicioOtro: 5,
        codServicioOtro: 16,
        codPuesto: 2,
        fechaIngresoServicioOtro: "2025-01-17",
        fechaSalidaServicioOtro: "2025-03-21",
      });

      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toHaveProperty("Respuesta", "Actualizado");
      expect(respuesta.body).toHaveProperty("Detalle", 1);
    });
    it("debe retornar error cuando ya existe un ingreso servico otro con la misma fecha de entrada y salida ", async () => {
      (pool.task as jest.Mock).mockResolvedValueOnce({ caso: 1 });

      const respuesta = await request(app).put("/api/Isotro/update").send({
        codIngresoServicioOtro: 5,
        codServicioOtro: 16,
        codPuesto: 2,
        fechaIngresoServicioOtro: "2025-01-17",
        fechaSalidaServicioOtro: "2025-03-21",
      });

      expect(respuesta.status).toBe(404);
      expect(respuesta.body).toHaveProperty("Respuesta", "ya existe");
    });
    it("debe retornar error 404 si no se encuentra el ingreso servicio otro a actualizar", async () => {
      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 2,
        objActualizado: { rowCount: 0 },
      });

      const respuesta = await request(app).put("/api/Isotro/update").send({
        codIngresoServicioOtro: 999,
        codServicioOtro: 16,
        codPuesto: 2,
        fechaIngresoServicioOtro: "2025-01-17",
        fechaSalidaServicioOtro: "2025-03-21",
      });

      expect(respuesta.status).toBe(404);
      expect(respuesta.body).toHaveProperty(
        "Respuesta",
        "No se encontró el ingreso a actualizar"
      );
    });

    it("debe retornar errores de validación cuando los datos son inválidos", async () => {
      // Envío un body con datos inválidos
      const datosInvalidos = {
        codIngresoServicioOtro: "abc", // No numérico
        codServicioOtro: "", // Vacío
        codPuesto: "xyz", // No numérico
        fechaIngresoServicioOtro: "2023-13-40", // Fecha inválida
        fechaSalidaServicioOtro: "malfecha", // Fecha inválida
      };

      const respuesta = await request(app)
        .put("/api/Isotro/update")
        .send(datosInvalidos);

      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toHaveProperty("respuesta");
      expect(Array.isArray(respuesta.body.respuesta)).toBe(true);

      const errores = respuesta.body.respuesta;

      // Verifico que cada error esperado esté presente y tenga las propiedades adecuadas
      const camposEsperados = [
        {
          path: "codIngresoServicioOtro",
          msg: "El código del ingresoServicioOtro es obligatorio y debe ser numérico",
          location: "body",
        },
        {
          path: "codServicioOtro",
          msg: "El código del servicio es obligatorio y debe ser numérico",
          location: "body",
        },
        {
          path: "codPuesto",
          msg: "El código del puesto es obligatorio y debe ser numérico",
          location: "body",
        },
        {
          path: "fechaIngresoServicioOtro",
          msg: "debe estar en formato YYYY-MM-DD",
          location: "body",
        },
        {
          path: "fechaSalidaServicioOtro",
          msg: "La fecha de salida debe estar en formato YYYY-MM-DD",
          location: "body",
        },
      ];

      for (const campo of camposEsperados) {
        const error = errores.find((e: any) => e.path === campo.path);
        expect(error).toBeDefined();
        expect(error).toHaveProperty("msg", campo.msg);
        expect(error).toHaveProperty("location", campo.location);
        expect(error).toHaveProperty("type", "field");
      }
    });

    it("debe retornar error cuando falla la base de datos durante la actualización", async () => {
      // Simulamos un error genérico en la base de datos
      (pool.task as jest.Mock).mockRejectedValueOnce(
        new Error("Error inesperado en la base de datos")
      );

      const respuesta = await request(app).put("/api/Isotro/update").send({
        codIngresoServicioOtro: 999,
        codServicioOtro: 16,
        codPuesto: 2,
        fechaIngresoServicioOtro: "2025-01-17",
        fechaSalidaServicioOtro: "2025-03-21",
      });

      expect([400, 500]).toContain(respuesta.status);
      expect(respuesta.body).toHaveProperty("Respuesta", "Algo salio mal");
    });
  });
  /**
   * PRUEBAS PARA ELIMINAR UN INGRESO SERVICIO OTRO
   *
   * Ruta: DELETE /api/ingreso/delete/:codIngresoServicioOtro
   * Descripción: Elimina un ingreso servicio otro existente según su ID de ingreso
   */
  describe("DELETE /api/Isotro/delete/:codIngresoServicioOtro", () => {
    it("debe eliminar un ingreso servicio otro exitosamente", async () => {
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

      const codIngresoServicioOtro = 123;

      const respuesta = await request(app).delete(
        `/api/Isotro/delete/${codIngresoServicioOtro}`
      );

      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toHaveProperty("respuesta", "DatoEliminado");
      expect(respuesta.body).toHaveProperty("Filas borradas: ", 1);
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

      const codIngresoServicioOtro = 999;

      const respuesta = await request(app).delete(
        `/api/Isotro/delete/${codIngresoServicioOtro}`
      );

      expect(respuesta.status).toBe(404);
      expect(respuesta.body).toHaveProperty("Respuesta", "Dato no encontrado");
    });

    it("debe retornar error de validación si no se proporciona el ID", async () => {
      const respuesta = await request(app).delete("/api/Isotro/delete/");

      expect(respuesta.status).toBe(400); // Código típico para errores de validación
      expect(respuesta.body).toHaveProperty("respuesta");
      expect(Array.isArray(respuesta.body.respuesta)).toBe(true);
      expect(respuesta.body.respuesta[0]).toMatchObject({
        type: "field",
        msg: "Debe ser un numero y es obligatorio",
        path: "codIngresoServicioOtro",
        location: "params",
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

      const respuesta = await request(app).delete("/api/Isotro/delete/1");

      expect(respuesta.status).toBe(500);
      expect(respuesta.body).toHaveProperty("Respuesta", "Algo salio mal");
      expect(respuesta.body).toHaveProperty("Respuesta", expect.any(String));
    });
    it("debe retornar error 400 cuando hay dependencias (error 23503)", async () => {
      const mockClient = {
        result: jest.fn(),
      };

      (pool.task as jest.Mock).mockImplementationOnce(async () => {
        const error = new Error("Foreign key violation");
        (error as any).code = "23503";
        throw error;
      });

      const codIngresoServicioOtro = 123;

      const respuesta = await request(app).delete(
        `/api/Isotro/delete/${codIngresoServicioOtro}`
      );

      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toHaveProperty(
        "Respuesta",
        "No se puede eliminar el registro porque tiene dependencias"
      );
    });
  });
});
