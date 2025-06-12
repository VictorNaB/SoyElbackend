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
const originalConsoleLog = console.log;
beforeAll(() => {
  console.error = jest.fn();
  console.log = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
  console.log = originalConsoleLog;
});

describe("Pruebas Usuarios", () => {
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
   * PRUEBAS PARA OBTENER TODOS LOS USUARIOS
   *
   * Ruta: GET /api/usuario/getall
   * Descripción: Obtiene la lista de todos los usuarios registrados
   */
  describe("GET /api/usuario/getall", () => {
    const mockUsuarios = [
      {
        cod_usuario: 1,
        cod_rol: 1,
        documento_usuario: "12345678",
        nombres_usuario: "Juan Carlos",
        apellidos_usuario: "Pérez González",
        genero_usuario: 1,
        fecha_nacimiento_usuario: "1990-05-15",
        telefono_usuario: "3001234567"
      },
      {
        cod_usuario: 2,
        cod_rol: 2,
        documento_usuario: "87654321",
        nombres_usuario: "María Elena",
        apellidos_usuario: "García López",
        genero_usuario: 2,
        fecha_nacimiento_usuario: "1985-12-20",
        telefono_usuario: "3107654321"
      }
    ];

    it("debe retornar todos los usuarios cuando existen en la base de datos", async () => {
      mockPool.result.mockResolvedValueOnce({ rows: mockUsuarios, rowCount: 2 });
      
      const respuesta = await request(app).get("/api/usuario/getall");
      
      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toEqual(mockUsuarios);
      expect(mockPool.result).toHaveBeenCalledTimes(1);
      expect(mockPool.result).toHaveBeenCalledWith("SELECT * FROM usuarios");
    });

    it("debe retornar una lista vacía cuando no hay usuarios", async () => {
      mockPool.result.mockResolvedValueOnce({ rows: [], rowCount: 0 });
      
      const respuesta = await request(app).get("/api/usuario/getall");
      
      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toEqual([]);
    });

    it("debe retornar error cuando hay un problema en la base de datos", async () => {
      mockPool.result.mockRejectedValueOnce(new Error("Error de conexión"));
      
      const respuesta = await request(app).get("/api/usuario/getall");
      
      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toEqual({ 
        respuesta: "Error al consultar los usuarios" 
      });
    });
  });

  /**
   * PRUEBAS PARA CREAR UN NUEVO USUARIO
   *
   * Ruta: POST /api/usuario/add
   * Descripción: Crea un nuevo usuario en el sistema
   */
  describe("POST /api/usuario/add", () => {
    const nuevoUsuario = {
      codRol: 1,
      documentoUsuario: "12345678901",
      nombresUsuario: "Juan Carlos",
      apellidosUsuario: "Pérez González",
      generoUsuario: 1,
      fechaNacimientoUsuario: "1990-05-15",
      telefonoUsuario: "3001234567"
    };

    it("debe crear un nuevo usuario exitosamente", async () => {
      const mockTask = jest.fn().mockImplementation(async (callback) => {
        const mockConsulta = {
          one: jest.fn()
            .mockResolvedValueOnce({ cantidad: 0 }) // Usuario no existe
            .mockResolvedValueOnce({ cod_usuario: 1 }) // Usuario creado
        };
        return await callback(mockConsulta);
      });

      mockPool.task.mockImplementation(mockTask);
      
      const respuesta = await request(app)
        .post("/api/usuario/add")
        .send(nuevoUsuario);
      
      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toEqual({
        objCreado: { cod_usuario: 1 }
      });
      expect(mockPool.task).toHaveBeenCalledTimes(1);
    });

    it("debe validar que todos los campos requeridos estén presentes", async () => {
      const respuesta = await request(app)
        .post("/api/usuario/add")
        .send({});
      
      expect(respuesta.status).toBe(400);
      expect(respuesta.body.respuesta).toBeDefined();
      expect(typeof respuesta.body.respuesta).toBe('string');
      expect(respuesta.body.respuesta).toContain('Campos requeridos faltantes');
    });

    it("debe manejar usuario duplicado", async () => {
      const mockTask = jest.fn().mockImplementation(async (callback) => {
        const mockConsulta = {
          one: jest.fn().mockResolvedValueOnce({ cantidad: 1 }) // Usuario ya existe
        };
        return await callback(mockConsulta);
      });

      mockPool.task.mockImplementation(mockTask);
      
      const respuesta = await request(app)
        .post("/api/usuario/add")
        .send(nuevoUsuario);
      
      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toEqual({
        respuesta: "Vale mia eso ya esta"
      });
    });

    it("debe manejar errores de base de datos durante la creación", async () => {
      const mockTask = jest.fn().mockRejectedValueOnce(new Error("Error de inserción"));
      mockPool.task.mockImplementation(mockTask);
      
      const respuesta = await request(app)
        .post("/api/usuario/add")
        .send(nuevoUsuario);
      
      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toBe("No sirve");
    });
  });

  /**
   * PRUEBAS PARA ACTUALIZAR UN USUARIO
   *
   * Ruta: PUT /api/usuario/update
   * Descripción: Actualiza los datos de un usuario existente
   */
  describe("PUT /api/usuario/update", () => {
    const usuarioActualizado = {
      codUsuario: 1,
      codRol: 1,
      documentoUsuario: "12345678901",
      nombresUsuario: "Juan Carlos Actualizado",
      apellidosUsuario: "Pérez González",
      generoUsuario: 1,
      fechaNacimientoUsuario: "1990-05-15",
      telefonoUsuario: "3001234567"
    };

    it("debe actualizar un usuario existente", async () => {
      const mockTask = jest.fn().mockImplementation(async (callback) => {
        const mockConsulta = {
          one: jest.fn().mockResolvedValueOnce({ cantidad: 1 }), // Usuario existe
          result: jest.fn().mockResolvedValueOnce({ rowCount: 1 }) // Actualización exitosa
        };
        return await callback(mockConsulta);
      });

      mockPool.task.mockImplementation(mockTask);
      
      const respuesta = await request(app)
        .put("/api/usuario/update")
        .send(usuarioActualizado);
      
      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toEqual({
        objActualizado: { rowCount: 1 }
      });
      expect(mockPool.task).toHaveBeenCalledTimes(1);
    });

    it("debe validar que el usuario existe antes de actualizar", async () => {
      const mockTask = jest.fn().mockImplementation(async (callback) => {
        const mockConsulta = {
          one: jest.fn().mockResolvedValueOnce({ cantidad: 0 }) // Usuario no existe
        };
        return await callback(mockConsulta);
      });

      mockPool.task.mockImplementation(mockTask);
      
      const respuesta = await request(app)
        .put("/api/usuario/update")
        .send(usuarioActualizado);
      
      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toEqual({
        respuesta: "Vale mia eso ya esta"
      });
    });

    it("debe validar campos requeridos para actualización", async () => {
      const respuesta = await request(app)
        .put("/api/usuario/update")
        .send({});
      
      expect(respuesta.status).toBe(400);
      expect(respuesta.body.respuesta).toBeDefined();
    });

    it("debe manejar errores de base de datos en actualización", async () => {
      const mockTask = jest.fn().mockRejectedValueOnce(new Error("Error de actualización"));
      mockPool.task.mockImplementation(mockTask);
      
      const respuesta = await request(app)
        .put("/api/usuario/update")
        .send(usuarioActualizado);
      
      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toBe("No sirve");
    });
  });

  /**
   * PRUEBAS PARA ELIMINAR UN USUARIO
   *
   * Ruta: DELETE /api/usuario/delete/:codUsuario
   * Descripción: Elimina un usuario existente según su ID
   */
  describe("DELETE /api/usuario/delete/:codUsuario", () => {
    const usuarioAEliminar = {
      codRol: 1,
      documentoUsuario: "12345678901",
      nombresUsuario: "Juan Carlos",
      apellidosUsuario: "Pérez González",
      generoUsuario: 1,
      fechaNacimientoUsuario: "1990-05-15",
      telefonoUsuario: "3001234567"
    };

    it("debe eliminar un usuario existente sin relaciones", async () => {
      const mockTask = jest.fn().mockImplementation(async (callback) => {
        const mockConsulta = {
          one: jest.fn()
            .mockResolvedValueOnce({ cantidad: '0' }) // Sin accesos
            .mockResolvedValueOnce({ cantidad: '0' }) // Sin vehículos
            .mockResolvedValueOnce({ cantidad: '0' }) // Sin relaciones funcionalidad
            .mockResolvedValueOnce({ cantidad: '0' }), // Sin relaciones turno
          result: jest.fn().mockResolvedValueOnce({ rowCount: 1 }) // Eliminación exitosa
        };
        return await callback(mockConsulta);
      });

      mockPool.task.mockImplementation(mockTask);
      
      const respuesta = await request(app)
        .delete("/api/usuario/delete/1")
        .send(usuarioAEliminar);
      
      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toEqual({
        respuesta: "Usuario eliminado correctamente",
        detalles: {
          codUsuario: 1,
          filasBorradas: 1
        }
      });
    });

    it("debe impedir eliminar usuario con accesos asociados", async () => {
      const mockTask = jest.fn().mockImplementation(async (callback) => {
        const mockConsulta = {
          one: jest.fn()
            .mockResolvedValueOnce({ cantidad: '1' }) // Tiene accesos
            .mockResolvedValueOnce({ cantidad: '0' }) // Sin vehículos
            .mockResolvedValueOnce({ cantidad: '0' }) // Sin relaciones funcionalidad
            .mockResolvedValueOnce({ cantidad: '0' }) // Sin relaciones turno
        };
        
        const resultado = await callback(mockConsulta);
        return resultado;
      });

      mockPool.task.mockImplementation(mockTask);
      
      const respuesta = await request(app)
        .delete("/api/usuario/delete/1")
        .send(usuarioAEliminar);
      
      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toEqual({
        respuesta: "No se puede eliminar el usuario",
        detalles: {
          tieneAccesos: true,
          tieneVehiculos: false,
          tieneRelacionesFunc: false,
          tieneRelacionesTurno: false,
          mensaje: "El usuario tiene accesos, vehículos o relaciones asociadas que deben ser eliminadas primero"
        }
      });
    });

    it("debe impedir eliminar usuario con vehículos asociados", async () => {
      const mockTask = jest.fn().mockImplementation(async (callback) => {
        const mockConsulta = {
          one: jest.fn()
            .mockResolvedValueOnce({ cantidad: '0' }) // Sin accesos
            .mockResolvedValueOnce({ cantidad: '1' }) // Tiene vehículos
            .mockResolvedValueOnce({ cantidad: '0' }) // Sin relaciones funcionalidad
            .mockResolvedValueOnce({ cantidad: '0' }) // Sin relaciones turno
        };
        
        const resultado = await callback(mockConsulta);
        return resultado;
      });

      mockPool.task.mockImplementation(mockTask);
      
      const respuesta = await request(app)
        .delete("/api/usuario/delete/1")
        .send(usuarioAEliminar);
      
      expect(respuesta.status).toBe(400);
      expect(respuesta.body.respuesta).toBe("No se puede eliminar el usuario");
      expect(respuesta.body.detalles.tieneVehiculos).toBe(true);
    });

    it("debe manejar usuario no encontrado en eliminación", async () => {
      const mockTask = jest.fn().mockImplementation(async (callback) => {
        const mockConsulta = {
          one: jest.fn()
            .mockResolvedValueOnce({ cantidad: '0' }) // Sin accesos
            .mockResolvedValueOnce({ cantidad: '0' }) // Sin vehículos
            .mockResolvedValueOnce({ cantidad: '0' }) // Sin relaciones funcionalidad
            .mockResolvedValueOnce({ cantidad: '0' }), // Sin relaciones turno
          result: jest.fn().mockResolvedValueOnce({ rowCount: 0 }) // No se eliminó ningún registro
        };
        return await callback(mockConsulta);
      });

      mockPool.task.mockImplementation(mockTask);
      
      const respuesta = await request(app)
        .delete("/api/usuario/delete/999")
        .send(usuarioAEliminar);
      
      expect(respuesta.status).toBe(404);
      expect(respuesta.body).toEqual({
        respuesta: "No se encontró el usuario a eliminar",
        codUsuario: 999
      });
    });

    it("debe manejar errores de base de datos en eliminación", async () => {
      const mockTask = jest.fn().mockRejectedValueOnce(new Error("Error de eliminación"));
      mockPool.task.mockImplementation(mockTask);
      
      const respuesta = await request(app)
        .delete("/api/usuario/delete/1")
        .send(usuarioAEliminar);
      
      expect(respuesta.status).toBe(500);
      expect(respuesta.body).toEqual({
        respuesta: "Error al eliminar el usuario",
        error: "Error de eliminación"
      });
    });

    it("debe validar parámetro codUsuario inválido", async () => {
      const respuesta = await request(app)
        .delete("/api/usuario/delete/abc")
        .send(usuarioAEliminar);
      
      expect(respuesta.status).toBe(400);
      expect(respuesta.body.respuesta).toContain("número válido");
    });

    it("debe validar parámetro codUsuario negativo", async () => {
      const respuesta = await request(app)
        .delete("/api/usuario/delete/-1")
        .send(usuarioAEliminar);
      
      expect(respuesta.status).toBe(400);
      expect(respuesta.body.respuesta).toContain("mayor a 0");
    });

    it("debe validar campos requeridos para eliminación", async () => {
      const respuesta = await request(app)
        .delete("/api/usuario/delete/1")
        .send({});
      
      expect(respuesta.status).toBe(400);
      expect(respuesta.body.respuesta).toContain("Campos requeridos faltantes");
    });
  });
});
