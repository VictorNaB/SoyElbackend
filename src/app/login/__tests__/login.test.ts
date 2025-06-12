import request from "supertest";
import express from "express";
import Servidor from "../../../config/api/Servidor";
import pool from "../../../config/connection/dbConnetions";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

// Mockear dependencias externas
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("uuid");

// Definición del tipo para el mock pool (si es necesario mantenerla explícita)
type MockPool = {
  connect: jest.Mock;
  result: jest.Mock;
  oneOrNone: jest.Mock;
  one: jest.Mock;
  none: jest.Mock;
  task: jest.Mock;
  any: jest.Mock;
  tx: jest.Mock;
  batch: jest.Mock;
};

jest.mock("../../../config/connection/dbConnetions", () => {
  console.log('[MOCK DEBUG INIT] Creando mock para dbConnetions (login.test.ts)');
  return {
    connect: jest.fn(),
    result: jest.fn(),
    oneOrNone: jest.fn(),
    one: jest.fn(),
    none: jest.fn(),
    task: jest.fn(), // Se configurará en beforeEach
    any: jest.fn(),
    tx: jest.fn(),
    batch: jest.fn(),
  };
});

const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
// const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});


describe("Pruebas API Login", () => {
  let app: express.Application;
  const mockPool = pool as jest.Mocked<typeof pool>;
  const mockBcryptCompare = bcrypt.compare as jest.Mock;
  const mockJwtSign = jwt.sign as jest.Mock;
  const mockUuidv4 = uuidv4 as jest.Mock;

  const JWT_TEST_SECRET = "test-secret";
  const MOCK_NEW_UUID = "mock-uuid-1234";

  beforeAll(() => {
    process.env.JWT_SECRET = JWT_TEST_SECRET; // Asegurar que JWT_SECRET esté definido
    const servidor = new Servidor();
    app = servidor.app;
  });

  beforeEach(() => {
    jest.resetAllMocks(); // Resetea todos los mocks, incluyendo los de módulos externos

    // Reconfigurar la implementación de pool.task en cada beforeEach
    (pool.task as jest.Mock).mockImplementation((taskCallback: (consulta: any) => Promise<any>) => {
      // console.log('[MOCK beforeEach login.test.ts] pool.task EJECUTÁNDOSE.');
      const consultaContext = {
        one: pool.one as jest.Mock,
        oneOrNone: pool.oneOrNone as jest.Mock,
        result: pool.result as jest.Mock,
        any: pool.any as jest.Mock,
        none: pool.none as jest.Mock,
      };
      try {
        return taskCallback(consultaContext);
      } catch (e) {
        console.error('[MOCK task exec login.test.ts] Error síncrono en taskCallback:', e);
        return Promise.reject(e);
      }
    });

    // Implementaciones por defecto para los métodos del pool (opcional, pero útil)
    (pool.one as jest.Mock).mockImplementation(async (sql: string) => {
      // console.log(`[MOCK beforeEach default login.test.ts] pool.one CALLED (sin mock específico). SQL: ${sql}`);
      return undefined; 
    });
    (pool.oneOrNone as jest.Mock).mockImplementation(async (sql: string) => {
      // console.log(`[MOCK beforeEach default login.test.ts] pool.oneOrNone CALLED (sin mock específico). SQL: ${sql}`);
      return undefined;
    });
    (pool.result as jest.Mock).mockImplementation(async (sql: string) => {
      // console.log(`[MOCK beforeEach default login.test.ts] pool.result CALLED (sin mock específico). SQL: ${sql}`);
      return { rowCount: 0 };
    });
    
    // Restaurar mocks de console para que no interfieran entre tests si se usan puntualmente
    mockConsoleLog.mockClear();
    // mockConsoleError.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    delete process.env.JWT_SECRET;
  });

  describe("POST /api/login/add/", () => {
    const loginCredentials = {
      correoAcceso: "test@example.com",
      claveAcceso: "password123",
    };
    it("debe realizar el login exitosamente y devolver un token", async () => {
      const loginCredentials = {
          correoAcceso: "test@example.com",
          claveAcceso: "password123",
      };
  
      const mockHashedPassword = "hashedPassword";
      const mockCodUsuario = 1;
      const mockGeneratedToken = "mockToken";
      const mockDatosUsuarioParaToken = { codUsuario: mockCodUsuario, nombre: "Test User" };
      const mockDatosSesionRespuesta = {
        codingreso: 123,
        fechaingreso: "2024-05-30",
        horaingreso: "12:34:56",
      };
      
      
  
      (pool.oneOrNone as jest.Mock)
          .mockResolvedValueOnce({
              correoAcceso: loginCredentials.correoAcceso,
              claveAcceso: mockHashedPassword,
              codUsuario: mockCodUsuario,
          }) // sql_login.VALIDATE
          .mockResolvedValueOnce({ codUsuario: mockCodUsuario }); // sql_login.GETBYID
  
      mockBcryptCompare.mockResolvedValueOnce(true); // Simula que la contraseña es correcta
      mockUuidv4.mockReturnValueOnce("MOCK_NEW_UUID");
      (pool.result as jest.Mock).mockResolvedValueOnce({ rowCount: 1 }); // sql_Accesos.UPDATE_UUID
      (pool.one as jest.Mock)
          .mockResolvedValueOnce(mockDatosSesionRespuesta) // SQL_INGRESO.REGISTER_LOGIN
          .mockResolvedValueOnce(mockDatosUsuarioParaToken); // sql_usuarios.FIND_ALL
  
      mockJwtSign.mockReturnValueOnce(mockGeneratedToken);
  
      const respuesta = await request(app)
          .post("/api/login/add/")
          .send(loginCredentials);
  
      expect(respuesta.status).toBe(200);
      expect(respuesta.body.respuesta).toEqual("inicio de sesion exitoso");
      expect(respuesta.body.usuario).toEqual(mockDatosUsuarioParaToken);
      expect(respuesta.body.sesion).toEqual({
        codIngreso: mockDatosSesionRespuesta.codingreso,
        fechaIngreso: mockDatosSesionRespuesta.fechaingreso,
        horaIngreso: mockDatosSesionRespuesta.horaingreso,
      });
      
      expect(respuesta.body.token).toEqual(mockGeneratedToken);
  
      // Verificaciones de llamadas
      expect(pool.oneOrNone).toHaveBeenCalledWith(expect.any(String), [loginCredentials.correoAcceso]); // sql_login.VALIDATE
      expect(mockBcryptCompare).toHaveBeenCalledWith(loginCredentials.claveAcceso, mockHashedPassword); // Verifica la comparación de contraseñas
      expect(pool.oneOrNone).toHaveBeenCalledWith(expect.any(String), [mockCodUsuario]); // sql_login.GETBYID
      expect(mockUuidv4).toHaveBeenCalled();
      expect(pool.result).toHaveBeenCalledWith(expect.any(String), ["MOCK_NEW_UUID", mockCodUsuario]); // sql_Accesos.UPDATE_UUID
      expect(pool.one).toHaveBeenCalledWith(expect.any(String), [mockCodUsuario]); // SQL_INGRESO.REGISTER_LOGIN
      expect(pool.one).toHaveBeenCalledWith(expect.any(String), [mockCodUsuario]); // sql_usuarios.FIND_ALL
      expect(mockJwtSign).toHaveBeenCalledWith(mockDatosUsuarioParaToken, JWT_TEST_SECRET, { expiresIn: "1m" });
  });
    it("debe retornar error 401 si el usuario no existe", async () => {
      (pool.oneOrNone as jest.Mock)
        // 1. sql_login.VALIDATE - Usuario no encontrado
        .mockResolvedValueOnce(null);

      const respuesta = await request(app)
        .post("/api/login/add/")
        .send(loginCredentials);

      expect(respuesta.status).toBe(401);
      expect(respuesta.body).toEqual({ respuesta: "El usuario no existe" });
    });

    it("debe retornar error 401 si la contraseña es incorrecta", async () => {
      const mockCodUsuario = 1;
      const mockHashedPassword = "hashedPassword";

      (pool.oneOrNone as jest.Mock)
        // 1. sql_login.VALIDATE - Usuario encontrado
        .mockResolvedValueOnce({ cod_usuario: mockCodUsuario, clave_acceso: mockHashedPassword });
      
      // 2. bcrypt.compare - Contraseña incorrecta
      mockBcryptCompare.mockResolvedValueOnce(false); 

      const respuesta = await request(app)
        .post("/api/login/add/")
        .send(loginCredentials);

      expect(respuesta.status).toBe(401);
      expect(respuesta.body).toEqual({ respuesta: "El usuario no existe" });
    });

    it("debe retornar error 400 si el usuario no tiene acceso (caso 2)", async () => {
      const mockCodUsuario = 1;
      const mockHashedPassword = "hashedPassword";

      (pool.oneOrNone as jest.Mock)
        // 1. sql_login.VALIDATE - Usuario encontrado
        .mockResolvedValueOnce({ cod_usuario: mockCodUsuario, clave_acceso: mockHashedPassword })
        // 2. sql_login.GETBYID - Acceso no encontrado
        .mockResolvedValueOnce(null);
      
      // bcrypt.compare - Contraseña correcta
      mockBcryptCompare.mockResolvedValueOnce(true); 
      
      const respuesta = await request(app)
        .post("/api/login/add/")
        .send(loginCredentials);
      
      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toEqual({ respuesta: "El usuario no tiene acceso" });
    });

    it("debe retornar error 400 (Eso no sirve) en caso de un error de BD no controlado", async () => {
      (pool.oneOrNone as jest.Mock)
        // 1. sql_login.VALIDATE - Falla la consulta
        .mockRejectedValueOnce(new Error("Error simulado de base de datos"));

      const respuesta = await request(app)
        .post("/api/login/add/")
        .send(loginCredentials);

      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toEqual({ respuesta: "Eso no sirve" });
    });

    // Tests de validación de entrada (ej. correo no válido, campos faltantes) si aplica
    // Estos dependerán de cómo esté configurado `datosvalidar` y `validarDatos.ahora`
    // Ejemplo (si correoAcceso es requerido):
    /*
    it("debe retornar error 400 si correoAcceso no se proporciona", async () => {
      const { claveAcceso } = loginCredentials;
      const respuesta = await request(app)
        .post("/api/login/add/")
        .send({ claveAcceso }); // Sin correoAcceso

      expect(respuesta.status).toBe(400);
      // El cuerpo del error dependerá de la configuración de express-validator
      // expect(respuesta.body).toEqual(expect.objectContaining({ errores: expect.any(Array) })); 
    });
    */

  });
}); 