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

describe("Pruebas rel rol funcionalidades", () => {
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
   * PRUEBAS PARA OBTENER TODOS LOS rel rol funcionalidades
   *
   * Ruta: GET /api/Rerolfuncionalida/getAll
   * Descripción: Obtiene la lista de todos los ingresos registrados
   */
  describe("GET /api/Rerolfuncionalida/getall", () => {
    it("debe retornar todos los rel rol funcionalidad cuando existen en la base de datos", async () => {
      const ejemplo = [
        {
          codRol: 1,
          nombreRol: "cliente",
          codFuncionalidad: 1,
          nombreFuncionalidad: "como",
          urlFuncionalidad: "htss_sss",
        },
      ];

      (pool.result as jest.Mock).mockResolvedValueOnce({
        rows: ejemplo,
        rowCount: ejemplo.length,
      });

      const respuesta = await request(app).get("/api/Rerolfuncionalida/getAll");

      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toHaveProperty("detalle");
      expect(Array.isArray(respuesta.body.detalle)).toBe(true);
      expect(respuesta.body.detalle).toEqual(ejemplo);
    });

    it("debe retornar un array vacío cuando no hay rel rol funcionalidades", async () => {
      (pool.result as jest.Mock).mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
      });

      const respuesta = await request(app).get("/api/Rerolfuncionalida/getAll");

      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toEqual({
        respuesta:
          "Relaciones de rol con funcionalidades obtenidas correctamente",
        detalle: [],
      });
    });

    it("debe retornar error cuando hay un problema en la base de datos", async () => {
      (pool.result as jest.Mock).mockRejectedValueOnce(
        new Error("Error de conexión a la base de datos")
      );

      const respuesta = await request(app).get("/api/Rerolfuncionalida/getAll");

      expect(respuesta.status).toBe(500);
      expect(respuesta.body).toEqual({
        Respuesta: "Algo salio mal",
      });
    });
  });
  /**
   * PRUEBAS PARA CREAR UN NUEVO rel rol funcionalidad
   *
   * Ruta: POST /api/Rerolfuncionalida/add
   * Descripción: Crea un nuevo rel rol funcionalidad en el sistema
   */
  describe("POST /api/Rerolfuncionalida/add", () => {
    it("debe crear un nuevo rel rol funcionalidad exitosamente", async () => {
      const nuevo = {
        codRol: 1,
        codFuncionalidad: 2,
      };

      (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
        const consulta = {
          one: jest
            .fn()
            .mockResolvedValueOnce({ cantidad: 1 }) // rol existe
            .mockResolvedValueOnce({ cantidad: 1 }) // funcionalidad existe
            .mockResolvedValueOnce({ cantidad: 0 }) // relación NO existe
            .mockResolvedValueOnce({
              codRol: nuevo.codRol,
              codFuncionalidad: nuevo.codFuncionalidad,
            }),
        };
        return callback(consulta);
      });

      const respuesta = await request(app)
        .post("/api/Rerolfuncionalida/add")
        .send(nuevo);

      expect([200, 201]).toContain(respuesta.status);
      expect(respuesta.body).toHaveProperty("respuesta");
      expect(respuesta.body.respuesta).toBe(
        "Relación rol-funcionalidad creada exitosamente"
      );
      expect(respuesta.body).toHaveProperty("detalles");
      expect(respuesta.body.detalles).toMatchObject(nuevo);
    });

    it("debe retornar error cuando falla la base de datos durante la creación", async () => {
      // Simular un fallo de la base de datos
      (pool.task as jest.Mock).mockRejectedValueOnce(
        new Error("Error de inserción")
      );

      const respuesta = await request(app)
        .post("/api/Rerolfuncionalida/add")
        .send({
          codRol: 1,
          codFuncionalidad: 2,
        });

      expect([400, 500]).toContain(respuesta.status);
      expect(respuesta.body).toHaveProperty("Respuesta");
      expect(respuesta.body.Respuesta).toBe("Algo salio mal");
    });
  });
  /**
   * PRUEBAS PARA ACTUALIZAR UN rel rol funcionalidad
   *
   * Ruta: PUT /api/Rerolfuncionalida/update
   * Descripción: Actualiza los datos de un rel rol funcionalidad existente
   */
  describe("PUT /api/Rerolfuncionalida/update", () => {
    it("debe actualizar un rel rol funcionalidad exitosamente", async () => {
      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 3,
        relActualizada: { rowCount: 1 },
      });

      const respuesta = await request(app)
        .put("/api/Rerolfuncionalida/update")
        .send({
          oldCodRol: 1,
          oldCodFuncionalidad: 9,
          newCodRol: 1,
          newCodFuncionalidad: 12,
        });

      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toHaveProperty("Respuesta", "Actualizado");
    });
    it("debe retornar 404 cuando la relación a actualizar no existe (caso 1)", async () => {
      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 1,
        oldRel: { codRol: 1, codFuncionalidad: 1 },
      });

      const res = await request(app).put("/api/Rerolfuncionalida/update").send({
        oldCodRol: 1,
        oldCodFuncionalidad: 1,
        newCodRol: 1,
        newCodFuncionalidad: 9,
      });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty(
        "respuesta",
        "La relación rol-funcionalidad que intenta actualizar no existe"
      );
      expect(res.body).toHaveProperty("detalles", {
        codRol: 1,
        codFuncionalidad: 1,
      });
    });

    it("debe retornar 400 cuando la nueva relación ya existe (caso 2)", async () => {
      (pool.task as jest.Mock).mockResolvedValueOnce({
        caso: 2,
        newRel: { codRol: 1, codFuncionalidad: 9 },
      });

      const res = await request(app).put("/api/Rerolfuncionalida/update").send({
        oldCodRol: 1,
        oldCodFuncionalidad: 1,
        newCodRol: 1,
        newCodFuncionalidad: 9,
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "respuesta",
        "Ya existe una relación con el nuevo rol y funcionalidad"
      );
      expect(res.body).toHaveProperty("detalles", {
        codRol: 1,
        codFuncionalidad: 9,
      });
    });
    /**
     * PRUEBAS PARA ELIMINAR UN rel rol funcionalidad
     *
     * Ruta: DELETE /api/Rerolfuncionalida/delete/:codRol/:codFuncionalidad
     * Descripción: Elimina una relación rol-funcionalidad específica
     */
    describe("DELETE /api/Rerolfuncionalida/delete/:codRol/:codFuncionalidad", () => {
      // Caso 1: Eliminación exitosa
      it("debe eliminar una relación rol-funcionalidad exitosamente", async () => {
        (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
          const consulta = {
            one: jest.fn().mockResolvedValueOnce({ cantidad: "1" }),
            result: jest.fn().mockResolvedValueOnce({ rowCount: 1 }),
          };
          return callback(consulta);
        });

        const respuesta = await request(app)
          .delete("/api/Rerolfuncionalida/delete/1/2");

        expect(respuesta.status).toBe(200);
        expect(respuesta.body).toHaveProperty(
          "respuesta",
          "Relación rol-funcionalidad eliminada correctamente"
        );
        expect(respuesta.body).toHaveProperty("detalles");
        expect(respuesta.body.detalles).toMatchObject({
          codRol: 1,
          codFuncionalidad: 2,
          filasBorradas: 1,
        });
      });

      // Caso 2: Relación no existe
      it("debe retornar 404 si la relación a eliminar no existe", async () => {
        (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
          const consulta = {
            one: jest.fn().mockResolvedValueOnce({ cantidad: "0" }),
          };
          return callback(consulta);
        });

        const respuesta = await request(app)
          .delete("/api/Rerolfuncionalida/delete/1/99");

        expect(respuesta.status).toBe(404);
        expect(respuesta.body).toHaveProperty(
          "respuesta",
          "No se encontró la relación rol-funcionalidad a eliminar"
        );
        expect(respuesta.body).toHaveProperty("detalles");
        expect(respuesta.body.detalles).toMatchObject({
          codRol: 1,
          codFuncionalidad: 99,
        });
      });

      // Caso 3: Error inesperado en la base de datos
      it("debe retornar error 500 si ocurre un error inesperado en la base de datos", async () => {
        (pool.task as jest.Mock).mockRejectedValueOnce(new Error("Error DB"));

        const respuesta = await request(app)
          .delete("/api/Rerolfuncionalida/delete/1/2");

        expect(respuesta.status).toBe(500);
        expect(respuesta.body).toHaveProperty(
          "respuesta",
          "Error al eliminar la relación rol-funcionalidad"
        );
        expect(respuesta.body).toHaveProperty("error");
      });
    });
  });
});
