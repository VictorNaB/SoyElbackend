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

describe("Pruebas Accesos", () => {
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
   * PRUEBAS PARA OBTENER TODOS LOS ACCESOS
   *
   * Ruta: GET /api/acceso/getall
   * Descripción: Obtiene la lista de todos los accesos registrados
   */
  describe("GET /api/acceso/getall", () => {
    it("debe retornar todos los accesos cuando existen en la base de datos", async () => {
      const accesosEjemplo = [
        {
          cod_usuario: 1,
          correo_acceso: "admin@example.com",
          clave_acceso: "claveAdmin",
          uuid_acceso: "uuid1",
        },
      ];
      
      (pool.result as jest.Mock).mockResolvedValueOnce({
        rows: accesosEjemplo,
        rowCount: 1,
      });
      
      const respuesta = await request(app).get("/api/acceso/getall");
      
      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toEqual(accesosEjemplo);
      expect(pool.result).toHaveBeenCalledTimes(1);
    });

    it("debe retornar un array vacío cuando no hay accesos", async () => {
      (pool.result as jest.Mock).mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
      });
      
      const respuesta = await request(app).get("/api/acceso/getall");
      
      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toEqual([]);
    });

    it("debe retornar error cuando hay un problema en la base de datos", async () => {
      (pool.result as jest.Mock).mockRejectedValueOnce(
        new Error("Error de conexión a la base de datos")
      );
      
      const respuesta = await request(app).get("/api/acceso/getall");
      
      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toHaveProperty("Respuesta", "Error al obtener los accesos");
      expect(respuesta.body).toHaveProperty("result");
    });
  });

  /**
   * PRUEBAS PARA CREAR UN NUEVO ACCESO
   *
   * Ruta: POST /api/acceso/add
   * Descripción: Crea un nuevo acceso en el sistema
   */
  describe("POST /api/acceso/add", () => {
    it("debe crear un nuevo acceso exitosamente", async () => {
      const nuevoAcceso = {
        codUsuario: 3,
        correo: "nuevo@example.com",
        clave: "nuevaClave",
        uuid: "uuid3uuid",
      };

      const mockConsulta = {
        oneOrNone: jest.fn(),
        one: jest.fn(),
      };

      // Simular las consultas en orden
      mockConsulta.oneOrNone
        .mockResolvedValueOnce({ cod_usuario: 3 }) // Usuario existe
        .mockResolvedValueOnce(null) // No existe acceso previo
        .mockResolvedValueOnce(null); // Correo no está en uso

      mockConsulta.one.mockResolvedValueOnce({ cod_usuario: 3 }); // Creación exitosa

      (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
        return await callback(mockConsulta);
      });

      const respuesta = await request(app)
        .post("/api/acceso/add")
        .send(nuevoAcceso);

      expect(respuesta.status).toBe(201);
      expect(respuesta.body).toEqual({
        status: "success",
        message: "Acceso creado correctamente",
        data: { cod_usuario: 3 }
      });
    });

    it("debe retornar error cuando el usuario no existe", async () => {
      const nuevoAcceso = {
        codUsuario: 999,
        correo: "nuevo@example.com",
        clave: "nuevaClave",
        uuid: "uuid999",
      };

      const mockConsulta = {
        oneOrNone: jest.fn(),
      };

      mockConsulta.oneOrNone.mockResolvedValueOnce(null); // Usuario no existe

      (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
        return await callback(mockConsulta);
      });

      const respuesta = await request(app)
        .post("/api/acceso/add")
        .send(nuevoAcceso);

      expect(respuesta.status).toBe(404);
      expect(respuesta.body).toEqual({
        status: "error",
        message: "El usuario no existe en la base de datos"
      });
    });

    it("debe retornar error cuando ya existe un acceso para el usuario", async () => {
      const nuevoAcceso = {
        codUsuario: 1,
        correo: "nuevo@example.com",
        clave: "nuevaClave",
        uuid: "uuid1",
      };

      const mockConsulta = {
        oneOrNone: jest.fn(),
      };

      mockConsulta.oneOrNone
        .mockResolvedValueOnce({ cod_usuario: 1 }) // Usuario existe
        .mockResolvedValueOnce({ cod_usuario: 1 }); // Ya existe acceso

      (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
        return await callback(mockConsulta);
      });

      const respuesta = await request(app)
        .post("/api/acceso/add")
        .send(nuevoAcceso);

      expect(respuesta.status).toBe(404);
      expect(respuesta.body).toEqual({
        status: "error",
        message: "Ya existe un acceso registrado para este usuario"
      });
    });

    it("debe retornar error cuando el correo ya está en uso", async () => {
      const nuevoAcceso = {
        codUsuario: 3,
        correo: "admin@example.com",
        clave: "nuevaClave",
        uuid: "uuid3",
      };

      const mockConsulta = {
        oneOrNone: jest.fn(),
      };

      mockConsulta.oneOrNone
        .mockResolvedValueOnce({ cod_usuario: 3 }) // Usuario existe
        .mockResolvedValueOnce(null) // No existe acceso previo
        .mockResolvedValueOnce({ correo_acceso: "admin@example.com" }); // Correo en uso

      (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
        return await callback(mockConsulta);
      });

      const respuesta = await request(app)
        .post("/api/acceso/add")
        .send(nuevoAcceso);

      expect(respuesta.status).toBe(404);
      expect(respuesta.body).toEqual({
        status: "error",
        message: "El correo electrónico ya está en uso"
      });
    });

    it("debe manejar errores de violación de clave foránea", async () => {
      const nuevoAcceso = {
        codUsuario: 999,
        correo: "nuevo@example.com",
        clave: "nuevaClave",
        uuid: "uuid999",
      };

      const error = new Error("Foreign key violation");
      (error as any).code = "23503";
      (error as any).detail = "Usuario no existe";

      (pool.task as jest.Mock).mockRejectedValueOnce(error);

      const respuesta = await request(app)
        .post("/api/acceso/add")
        .send(nuevoAcceso);

      expect(respuesta.status).toBe(404);
      expect(respuesta.body).toEqual({
        status: "error",
        message: "Error: El usuario referenciado no existe",
        detail: "Usuario no existe"
      });
    });

    it("debe manejar errores generales de base de datos", async () => {
      const nuevoAcceso = {
        codUsuario: 3,
        correo: "nuevo@example.com",
        clave: "nuevaClave",
        uuid: "uuid3",
      };

      (pool.task as jest.Mock).mockRejectedValueOnce(
        new Error("Error de inserción")
      );

      const respuesta = await request(app)
        .post("/api/acceso/add")
        .send(nuevoAcceso);

      expect(respuesta.status).toBe(500);
      expect(respuesta.body).toEqual({
        status: "error",
        message: "Error al crear el acceso",
        detail: "Error de inserción"
      });
    });
  });

  /**
   * PRUEBAS PARA ACTUALIZAR UN ACCESO
   *
   * Ruta: PUT /api/acceso/update
   * Descripción: Actualiza los datos de un acceso existente
   */
  describe("PUT /api/acceso/update", () => {
    it("debe actualizar un acceso exitosamente", async () => {
      const accesoActualizado = {
        codUsuario: 1,
        correo: "actualizado@example.com",
        clave: "nuevaClave",
        uuid: "nuevoUuid"
      };

      const mockConsulta = {
        oneOrNone: jest.fn(),
        none: jest.fn(),
      };

      mockConsulta.oneOrNone
        .mockResolvedValueOnce({ cod_usuario: 1 }) // Usuario existe
        .mockResolvedValueOnce({ cod_usuario: 1 }) // Acceso existe
        .mockResolvedValueOnce(null); // Correo no está en uso por otro usuario

      mockConsulta.none.mockResolvedValueOnce(undefined); // Actualización exitosa

      (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
        return await callback(mockConsulta);
      });

      const respuesta = await request(app)
        .put("/api/acceso/update")
        .send(accesoActualizado);

      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toEqual({
        status: "success",
        message: "Acceso actualizado correctamente"
      });
    });

    it("debe retornar error cuando el usuario no existe", async () => {
      const accesoActualizado = {
        codUsuario: 999,
        correo: "actualizado@example.com",
        clave: "nuevaClave",
        uuid: "nuevoUuid"
      };

      const mockConsulta = {
        oneOrNone: jest.fn(),
      };

      mockConsulta.oneOrNone.mockResolvedValueOnce(null); // Usuario no existe

      (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
        return await callback(mockConsulta);
      });

      const respuesta = await request(app)
        .put("/api/acceso/update")
        .send(accesoActualizado);

      expect(respuesta.status).toBe(404);
      expect(respuesta.body).toEqual({
        status: "error",
        message: "El usuario no existe en la base de datos"
      });
    });

    it("debe retornar error cuando el acceso no existe", async () => {
      const accesoActualizado = {
        codUsuario: 1,
        correo: "actualizado@example.com",
        clave: "nuevaClave",
        uuid: "nuevoUuid"
      };

      const mockConsulta = {
        oneOrNone: jest.fn(),
      };

      mockConsulta.oneOrNone
        .mockResolvedValueOnce({ cod_usuario: 1 }) // Usuario existe
        .mockResolvedValueOnce(null); // Acceso no existe

      (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
        return await callback(mockConsulta);
      });

      const respuesta = await request(app)
        .put("/api/acceso/update")
        .send(accesoActualizado);

      expect(respuesta.status).toBe(404);
      expect(respuesta.body).toEqual({
        status: "error",
        message: "No existe un acceso registrado para este usuario"
      });
    });

    it("debe retornar error cuando el correo ya está en uso por otro usuario", async () => {
      const accesoActualizado = {
        codUsuario: 1,
        correo: "admin@example.com",
        clave: "nuevaClave",
        uuid: "nuevoUuid"
      };

      const mockConsulta = {
        oneOrNone: jest.fn(),
      };

      mockConsulta.oneOrNone
        .mockResolvedValueOnce({ cod_usuario: 1 }) // Usuario existe
        .mockResolvedValueOnce({ cod_usuario: 1 }) // Acceso existe
        .mockResolvedValueOnce({ cod_usuario: 2 }); // Correo en uso por otro usuario

      (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
        return await callback(mockConsulta);
      });

      const respuesta = await request(app)
        .put("/api/acceso/update")
        .send(accesoActualizado);

      expect(respuesta.status).toBe(404);
      expect(respuesta.body).toEqual({
        status: "error",
        message: "El correo electrónico ya está en uso por otro usuario"
      });
    });

    it("debe manejar errores de violación de clave foránea", async () => {
      const accesoActualizado = {
        codUsuario: 999,
        correo: "actualizado@example.com",
        clave: "nuevaClave",
        uuid: "nuevoUuid"
      };

      const error = new Error("Foreign key violation");
      (error as any).code = "23503";
      (error as any).detail = "Usuario no existe";

      (pool.task as jest.Mock).mockRejectedValueOnce(error);

      const respuesta = await request(app)
        .put("/api/acceso/update")
        .send(accesoActualizado);

      expect(respuesta.status).toBe(404);
      expect(respuesta.body).toEqual({
        status: "error",
        message: "Error: El usuario referenciado no existe",
        detail: "Usuario no existe"
      });
    });

    it("debe manejar errores generales de base de datos", async () => {
      const accesoActualizado = {
        codUsuario: 1,
        correo: "actualizado@example.com",
        clave: "nuevaClave",
        uuid: "nuevoUuid"
      };

      (pool.task as jest.Mock).mockRejectedValueOnce(
        new Error("Error de actualización")
      );

      const respuesta = await request(app)
        .put("/api/acceso/update")
        .send(accesoActualizado);

      expect(respuesta.status).toBe(500);
      expect(respuesta.body).toEqual({
        status: "error",
        message: "Error al actualizar el acceso",
        detail: "Error de actualización"
      });
    });
  });

  /**
   * PRUEBAS PARA ELIMINAR UN ACCESO
   *
   * Ruta: DELETE /api/acceso/delete/:codUsuario
   * Descripción: Elimina un acceso existente según su ID de usuario
   */
  describe("DELETE /api/acceso/delete/:codUsuario", () => {
    it("debe eliminar un acceso exitosamente", async () => {
      const mockConsulta = {
        oneOrNone: jest.fn(),
        result: jest.fn()
      };

      mockConsulta.oneOrNone.mockResolvedValueOnce({ cod_usuario: 1 }); // Acceso existe
      mockConsulta.result.mockResolvedValueOnce({ rowCount: 1 }); // Eliminación exitosa

      (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
        return await callback(mockConsulta);
      });

      const respuesta = await request(app).delete("/api/acceso/delete/1");

      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toEqual({
        respuesta: "Acceso eliminado correctamente",
        detalles: {
          codUsuario: 1,
          filasBorradas: 1
        }
      });
    });

    it("debe retornar error cuando el acceso no existe", async () => {
      const mockConsulta = {
        oneOrNone: jest.fn(),
        result: jest.fn()
      };

      mockConsulta.oneOrNone.mockResolvedValueOnce(null); // Acceso no existe

      (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
        return await callback(mockConsulta);
      });

      const respuesta = await request(app).delete("/api/acceso/delete/999");

      expect(respuesta.status).toBe(404);
      expect(respuesta.body).toEqual({
        respuesta: "No se encontró el acceso a eliminar",
        codUsuario: 999
      });
    });


    it("debe manejar errores de base de datos durante la eliminación", async () => {
      const mockConsulta = {
        oneOrNone: jest.fn(),
        result: jest.fn()
      };

      mockConsulta.oneOrNone.mockRejectedValueOnce(new Error("Error de eliminación"));

      (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
        return await callback(mockConsulta);
      });

      const respuesta = await request(app).delete("/api/acceso/delete/1");

      expect(respuesta.status).toBe(500);
      expect(respuesta.body).toEqual({
        respuesta: "Error al eliminar el acceso",
        error: "Error de eliminación"
      });
    });

    it("debe eliminar correctamente cuando existe pero no se borra ninguna fila", async () => {
      const mockConsulta = {
        oneOrNone: jest.fn(),
        result: jest.fn()
      };

      mockConsulta.oneOrNone.mockResolvedValueOnce({ cod_usuario: 1 }); // Acceso existe
      mockConsulta.result.mockResolvedValueOnce({ rowCount: 0 }); // No se borró ninguna fila

      (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
        return await callback(mockConsulta);
      });

      const respuesta = await request(app).delete("/api/acceso/delete/1");

      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toEqual({
        respuesta: "Acceso eliminado correctamente",
        detalles: {
          codUsuario: 1,
          filasBorradas: 0
        }
      });
    });
  });
});