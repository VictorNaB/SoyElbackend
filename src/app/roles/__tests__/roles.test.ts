import request from "supertest";
import express from "express";
import Servidor from "../../../config/api/Servidor";
import pool from "../../../config/connection/dbConnetions";

// Simulación de la conexión a la base de datos
jest.mock("../../../config/connection/dbConnetions", () => {
  const mockPool = {
    connect: jest.fn(),
    result: jest.fn(),
    oneOrNone: jest.fn(),
    one: jest.fn(),
    none: jest.fn(),
    task: jest.fn(),
    any: jest.fn(),
    tx: jest.fn(),
    batch: jest.fn()
  };
  return mockPool;
});

// Silenciar console.error durante las pruebas
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe("Pruebas Roles", () => {
  let app: express.Application;
  const mockPool = pool as jest.Mocked<typeof pool>;

  beforeAll(() => {
    const servidor = new Servidor();
    app = servidor.app;
  });

  beforeEach(() => {
    // Reiniciamos todos los mocks antes de cada prueba
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  /**
   * PRUEBAS PARA OBTENER TODOS LOS ROLES
   *
   * Ruta: GET /api/rol/getall
   * Descripción: Obtiene la lista de todos los roles registrados
   */
  describe("GET /api/rol/getall", () => {
    const mockRoles = [
      { cod_rol: 1, nombre_rol: "Administrador" },
      { cod_rol: 2, nombre_rol: "Usuario" }
    ];

    it("debe retornar todos los roles cuando existen en la base de datos", async () => {
      mockPool.result.mockResolvedValueOnce({ rows: mockRoles, rowCount: 2 });
      
      const respuesta = await request(app).get("/api/rol/getall");
      
      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toEqual({
        status: "success",
        message: "Roles obtenidos correctamente",
        data: mockRoles
      });
      expect(mockPool.result).toHaveBeenCalledTimes(1);
    });

    it("debe retornar una lista vacía cuando no hay roles", async () => {
      mockPool.result.mockResolvedValueOnce({ rows: [], rowCount: 0 });
      
      const respuesta = await request(app).get("/api/rol/getall");
      
      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toEqual({
        status: "success",
        message: "Roles obtenidos correctamente",
        data: []
      });
    });

    it("debe retornar error cuando hay un problema en la base de datos", async () => {
      mockPool.result.mockRejectedValueOnce(new Error("Error de conexión"));
      
      const respuesta = await request(app).get("/api/rol/getall");
      
      expect(respuesta.status).toBe(500);
      expect(respuesta.body).toEqual({
        status: "error",
        message: "Error al obtener los roles",
        detail: "Error de conexión"
      });
    });
  });

  /**
   * PRUEBAS PARA CREAR UN NUEVO ROL
   *
   * Ruta: POST /api/rol/add
   * Descripción: Crea un nuevo rol en el sistema
   */
  describe("POST /api/rol/add", () => {
    const nuevoRol = {
      nombreRol: "Nuevo Rol de Prueba"
    };

    it("debe crear un nuevo rol exitosamente", async () => {
      mockPool.one.mockResolvedValueOnce({ cantidad: 0 }); // Verificación de nombre duplicado
      mockPool.one.mockResolvedValueOnce({ cod_rol: 3, nombre_rol: nuevoRol.nombreRol }); // Creación del rol
      
      const respuesta = await request(app)
        .post("/api/rol/add")
        .send(nuevoRol);
      
      expect(respuesta.status).toBe(201);
      expect(respuesta.body).toEqual({
        status: "success",
        message: "Rol creado correctamente",
        data: {
          cod_rol: 3,
          nombre_rol: nuevoRol.nombreRol
        }
      });
      expect(mockPool.one).toHaveBeenCalledTimes(2);
      // Verificamos que se llamó con los parámetros correctos, no la consulta específica
      expect(mockPool.one).toHaveBeenNthCalledWith(1, expect.any(String), [nuevoRol.nombreRol]);
      expect(mockPool.one).toHaveBeenNthCalledWith(2, expect.any(String), [nuevoRol.nombreRol]);
    });

    it("debe validar que el campo nombreRol es requerido", async () => {
      const respuesta = await request(app)
        .post("/api/rol/add")
        .send({});
      
      expect(respuesta.status).toBe(400);
      expect(respuesta.body.respuesta).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            msg: expect.stringContaining("requerido")
          })
        ])
      );
    });

    it("debe validar el formato del nombre del rol", async () => {
      const rolInvalido = {
        nombreRol: "ab" // Nombre muy corto
      };
      
      const respuesta = await request(app)
        .post("/api/rol/add")
        .send(rolInvalido);
      
      expect(respuesta.status).toBe(400);
      expect(respuesta.body.respuesta).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            msg: "Minimo 5 caracteres"
          })
        ])
      );
    });

    it("debe validar que el nombre no sea solo espacios", async () => {
      const rolInvalido = {
        nombreRol: "     " // Solo espacios
      };
      
      const respuesta = await request(app)
        .post("/api/rol/add")
        .send(rolInvalido);
      
      expect(respuesta.status).toBe(400);
    });

    it("debe manejar nombres de rol duplicados", async () => {
      mockPool.one.mockResolvedValueOnce({ cantidad: 1 }); // Simula rol existente
      
      const respuesta = await request(app)
        .post("/api/rol/add")
        .send(nuevoRol);
      
      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toEqual({
        status: "error",
        message: "Ya existe un rol con ese nombre"
      });
    });

    it("debe manejar errores de base de datos durante la creación", async () => {
      mockPool.one
        .mockResolvedValueOnce({ cantidad: 0 }) // Verificación exitosa
        .mockRejectedValueOnce(new Error("Error de inserción")); // Error al insertar
      
      const respuesta = await request(app)
        .post("/api/rol/add")
        .send(nuevoRol);
      
      expect(respuesta.status).toBe(500);
      expect(respuesta.body).toEqual({
        status: "error",
        message: "Error al crear el rol",
        detail: "Error de inserción"
      });
    });
  });

  /**
   * PRUEBAS PARA ACTUALIZAR UN ROL
   *
   * Ruta: PUT /api/rol/update
   * Descripción: Actualiza los datos de un rol existente
   */
  describe("PUT /api/rol/update", () => {
    const rolActualizado = {
      codRol: 1,
      nombreRol: "Rol Actualizado"
    };

    it("debe actualizar un rol existente", async () => {
      mockPool.oneOrNone.mockResolvedValueOnce({ cod_rol: 1, nombre_rol: "Rol Original" }); // Rol existe
      mockPool.one.mockResolvedValueOnce({ cantidad: 0 }); // No hay duplicados
      mockPool.result.mockResolvedValueOnce({ rowCount: 1 }); // Actualización exitosa
      
      const respuesta = await request(app)
        .put("/api/rol/update")
        .send(rolActualizado);
      
      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toEqual({
        status: "success",
        message: "Rol actualizado correctamente"
      });
      expect(mockPool.oneOrNone).toHaveBeenCalledWith(expect.any(String), [rolActualizado.codRol]);
      expect(mockPool.result).toHaveBeenCalledWith(expect.any(String), [rolActualizado.nombreRol, rolActualizado.codRol]);
    });

    it("debe validar la existencia del rol", async () => {
      mockPool.oneOrNone.mockResolvedValueOnce(null); // Rol no existe
      
      const respuesta = await request(app)
        .put("/api/rol/update")
        .send(rolActualizado);
      
      expect(respuesta.status).toBe(404);
      expect(respuesta.body).toEqual({
        status: "error",
        message: "El rol no existe"
      });
    });

    it("debe validar que el nombre del rol no esté vacío", async () => {
      const rolConNombreVacio = {
        codRol: 1,
        nombreRol: ""
      };
      
      mockPool.oneOrNone.mockResolvedValueOnce({ cod_rol: 1, nombre_rol: "Rol Original" });
      
      const respuesta = await request(app)
        .put("/api/rol/update")
        .send(rolConNombreVacio);
      
      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toEqual({
        respuesta: [
          {
            location: "body",
            msg: "Nombre del rol requerido",
            path: "nombreRol",
            type: "field",
            value: ""
          },
          {
            location: "body",
            msg: "Minimo 5 caracteres",
            path: "nombreRol",
            type: "field",
            value: ""
          }
        ]
      });
    });

    it("debe validar nombres duplicados al actualizar", async () => {
      mockPool.oneOrNone.mockResolvedValueOnce({ cod_rol: 1, nombre_rol: "Rol Original" }); // Rol existe
      mockPool.one.mockResolvedValueOnce({ cantidad: 1 }); // Nombre duplicado
      
      const respuesta = await request(app)
        .put("/api/rol/update")
        .send(rolActualizado);
      
      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toEqual({
        status: "error",
        message: "Ya existe un rol con ese nombre"
      });
    });

    it("debe validar formato de entrada con campos requeridos", async () => {
      const respuesta = await request(app)
        .put("/api/rol/update")
        .send({});
      
      expect(respuesta.status).toBe(400);
    });

    it("debe manejar errores cuando no se pudo actualizar el rol", async () => {
      mockPool.oneOrNone.mockResolvedValueOnce({ cod_rol: 1, nombre_rol: "Rol Original" });
      mockPool.one.mockResolvedValueOnce({ cantidad: 0 });
      mockPool.result.mockResolvedValueOnce({ rowCount: 0 }); // No se actualizó ningún registro
      
      const respuesta = await request(app)
        .put("/api/rol/update")
        .send(rolActualizado);
      
      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toEqual({
        status: "error",
        message: "No se pudo actualizar el rol"
      });
    });

    it("debe manejar errores de base de datos en actualización", async () => {
      mockPool.oneOrNone.mockResolvedValueOnce({ cod_rol: 1, nombre_rol: "Rol Original" });
      mockPool.one.mockResolvedValueOnce({ cantidad: 0 });
      mockPool.result.mockRejectedValueOnce(new Error("Error de actualización"));
      
      const respuesta = await request(app)
        .put("/api/rol/update")
        .send(rolActualizado);
      
      expect(respuesta.status).toBe(500);
      expect(respuesta.body).toEqual({
        status: "error",
        message: "Error al actualizar el rol",
        detail: "Error de actualización"
      });
    });
  });

  /**
   * PRUEBAS PARA ELIMINAR UN ROL
   *
   * Ruta: DELETE /api/rol/delete/:codRol
   * Descripción: Elimina un rol existente según su ID
   */
  describe("DELETE /api/rol/delete/:codRol", () => {
    it("debe eliminar un rol existente", async () => {
      // Mock para verificar si el rol existe
      mockPool.oneOrNone.mockResolvedValueOnce({ cod_rol: 1, nombre_rol: "Rol Test" });
      // Mock para verificar usuarios asociados
      mockPool.one.mockResolvedValueOnce({ cantidad: 0 });
      // Mock para verificar funcionalidades asociadas
      mockPool.one.mockResolvedValueOnce({ cantidad: 0 });
      // Mock para la eliminación
      mockPool.result.mockResolvedValueOnce({ rowCount: 1 });
      
      const respuesta = await request(app).delete("/api/rol/delete/1");
      
      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toEqual({
        status: "success",
        message: "Rol eliminado correctamente"
      });
      expect(mockPool.oneOrNone).toHaveBeenCalledWith(expect.any(String), ['1']);
      expect(mockPool.one).toHaveBeenNthCalledWith(1, expect.any(String), ['1']);
      expect(mockPool.one).toHaveBeenNthCalledWith(2, expect.any(String), ['1']);
      expect(mockPool.result).toHaveBeenCalledWith(expect.any(String), ['1']);
    });

    it("debe manejar intentos de eliminar roles inexistentes", async () => {
      mockPool.oneOrNone.mockResolvedValueOnce(null); // Rol no existe
      
      const respuesta = await request(app).delete("/api/rol/delete/999");
      
      expect(respuesta.status).toBe(404);
      expect(respuesta.body).toEqual({
        status: "error",
        message: "El rol no existe"
      });
    });

    it("debe impedir eliminar roles con usuarios asociados", async () => {
      // Mock para verificar si el rol existe
      mockPool.oneOrNone.mockResolvedValueOnce({ cod_rol: 1, nombre_rol: "Rol Test" });
      // Mock para verificar usuarios asociados
      mockPool.one.mockResolvedValueOnce({ cantidad: 1 });
      
      const respuesta = await request(app).delete("/api/rol/delete/1");
      
      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toEqual({
        status: "error",
        message: "No se puede eliminar el rol: tiene usuarios asociados"
      });
    });

    it("debe impedir eliminar roles con funcionalidades asociadas", async () => {
      // Mock para verificar si el rol existe
      mockPool.oneOrNone.mockResolvedValueOnce({ cod_rol: 1, nombre_rol: "Rol Test" });
      // Mock para verificar usuarios asociados
      mockPool.one.mockResolvedValueOnce({ cantidad: 0 });
      // Mock para verificar funcionalidades asociadas
      mockPool.one.mockResolvedValueOnce({ cantidad: 1 });
      
      const respuesta = await request(app).delete("/api/rol/delete/1");
      
      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toEqual({
        status: "error",
        message: "No se puede eliminar el rol: tiene funcionalidades asociadas"
      });
    });

    it("debe manejar errores de base de datos en eliminación", async () => {
      // Mock para verificar si el rol existe
      mockPool.oneOrNone.mockResolvedValueOnce({ cod_rol: 1, nombre_rol: "Rol Test" });
      // Mock para verificar usuarios asociados
      mockPool.one.mockResolvedValueOnce({ cantidad: 0 });
      // Mock para verificar funcionalidades asociadas
      mockPool.one.mockResolvedValueOnce({ cantidad: 0 });
      // Mock para la eliminación con error
      mockPool.result.mockRejectedValueOnce(new Error("Error de eliminación"));
      
      const respuesta = await request(app).delete("/api/rol/delete/1");
      
      expect(respuesta.status).toBe(500);
      expect(respuesta.body).toEqual({
        status: "error",
        message: "Error al eliminar el rol",
        detail: "Error de eliminación"
      });
    });

    it("debe manejar caso donde el rol no se elimina por razones desconocidas", async () => {
      // Mock para verificar si el rol existe
      mockPool.oneOrNone.mockResolvedValueOnce({ cod_rol: 1, nombre_rol: "Rol Test" });
      // Mock para verificar usuarios asociados
      mockPool.one.mockResolvedValueOnce({ cantidad: 0 });
      // Mock para verificar funcionalidades asociadas
      mockPool.one.mockResolvedValueOnce({ cantidad: 0 });
      // Mock para la eliminación que no afecta ningún registro
      mockPool.result.mockResolvedValueOnce({ rowCount: 0 });
      
      const respuesta = await request(app).delete("/api/rol/delete/1");
      
      expect(respuesta.status).toBe(404);
      expect(respuesta.body).toEqual({
        status: "error",
        message: "El rol no existe"
      });
    });

    it("debe manejar parámetros inválidos", async () => {
      const respuesta = await request(app).delete("/api/rol/delete/abc");
      
      // Dependiendo de la validación, podría ser 400 o continuar con 'abc' como string
      // El comportamiento exacto depende de si hay validación de parámetros
      expect([400, 404, 500]).toContain(respuesta.status);
    });
  });
});