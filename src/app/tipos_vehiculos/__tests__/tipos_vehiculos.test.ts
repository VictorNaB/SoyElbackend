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
  any: jest.fn(),
  task: jest.fn(),
}));

describe("Pruebas Tipos de Vehículo", () => {
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
   * PRUEBAS PARA OBTENER TODOS LOS TIPOS DE VEHÍCULO
   *
   * Ruta: GET /api/tipovehiculo/getall
   * Descripción: Obtiene la lista de todos los tipos de vehículo registrados
   */
  describe("GET /api/tipovehiculo/getall", () => {
    it("debe retornar todos los tipos de vehículo cuando existen en la base de datos", async () => {
      const tiposVehiculoEjemplo = [
        {
          cod_tipo_vehiculo: 1,
          clase_tipo_vehiculo: "Automóvil"
        },
        {
          cod_tipo_vehiculo: 2,
          clase_tipo_vehiculo: "Motocicleta"
        },
        {
          cod_tipo_vehiculo: 3,
          clase_tipo_vehiculo: "Camión"
        }
      ];

      (pool.result as jest.Mock).mockResolvedValueOnce({
        rows: tiposVehiculoEjemplo
      });

      const respuesta = await request(app).get("/api/tipovehiculo/getall");

      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toEqual({
        respuesta: "Consulta de tipos de vehiculos exitosa",
        cantidad: tiposVehiculoEjemplo.length,
        tiposVehiculos: tiposVehiculoEjemplo
      });
      expect(pool.result).toHaveBeenCalledWith(
        expect.stringContaining("SELECT tv.cod_tipo_vehiculo, tv.clase_tipo_vehiculo FROM tipos_vehiculos")
      );
    });

    it("debe retornar 404 cuando no existen tipos de vehículo", async () => {
      (pool.result as jest.Mock).mockResolvedValueOnce({
        rows: []
      });

      const respuesta = await request(app).get("/api/tipovehiculo/getall");

      expect(respuesta.status).toBe(404);
      expect(respuesta.body).toEqual({
        respuesta: "No se encontraron tipos de vehículo"
      });
    });

    it("debe retornar error 500 cuando hay un problema en la base de datos", async () => {
      (pool.result as jest.Mock).mockRejectedValueOnce(
        new Error("Error de conexión a la base de datos")
      );

      const respuesta = await request(app).get("/api/tipovehiculo/getall");

      expect(respuesta.status).toBe(500);
      expect(respuesta.body).toEqual({
        respuesta: "Error interno al consultar tipos de vehículo"
      });
    });
  });

  /**
   * PRUEBAS PARA CREAR UN NUEVO TIPO DE VEHÍCULO
   *
   * Ruta: POST /api/tipovehiculo/add
   * Descripción: Crea un nuevo tipo de vehículo en el sistema
   */
  describe("POST /api/tipovehiculo/add", () => {
    it("debe crear un nuevo tipo de vehículo exitosamente", async () => {
      const nuevoTipoVehiculo = {
        claseTipoVehiculo: "Bicicleta"
      };

      const tipoVehiculoCreado = {
        cod_tipo_vehiculo: 4
      };

      (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
        const mockClient = {
          one: jest.fn()
        };

        // Mock para verificar que el tipo no existe
        mockClient.one.mockResolvedValueOnce({ cantidad: 0 });
        
        // Mock para crear el tipo de vehículo
        mockClient.one.mockResolvedValueOnce(tipoVehiculoCreado);

        const resultado = await callback(mockClient);
        return { caso: 2, objGrabado: tipoVehiculoCreado };
      });

      const respuesta = await request(app)
        .post("/api/tipovehiculo/add")
        .send(nuevoTipoVehiculo);

      expect(respuesta.status).toBe(201);
      expect(respuesta.body).toEqual({
        respuesta: "Tipo de vehículo creado exitosamente",
        tipoVehiculo: tipoVehiculoCreado
      });
    });

    it("debe retornar 409 cuando ya existe un tipo de vehículo con el mismo nombre", async () => {
      const tipoVehiculoExistente = {
        claseTipoVehiculo: "Automóvil"
      };

      (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
        const mockClient = {
          one: jest.fn()
        };

        // Mock para verificar que el tipo ya existe
        mockClient.one.mockResolvedValueOnce({ cantidad: 1 });

        const resultado = await callback(mockClient);
        return { caso: 1 };
      });

      const respuesta = await request(app)
        .post("/api/tipovehiculo/add")
        .send(tipoVehiculoExistente);

      expect(respuesta.status).toBe(409);
      expect(respuesta.body).toEqual({
        respuesta: "El tipo de vehículo ya existe"
      });
    });

    it("debe retornar 400 cuando los datos son inválidos (sin claseTipoVehiculo)", async () => {
      const datosInvalidos = {};

      const respuesta = await request(app)
        .post("/api/tipovehiculo/add")
        .send(datosInvalidos);

      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toEqual({
        respuesta: [
          {
            location: "body",
            msg: "El nombre del tipo de vehículo es obligatorio",
            path: "claseTipoVehiculo",
            type: "field"
          },
          {
            location: "body",
            msg: "El nombre debe tener entre 3 y 50 caracteres",
            path: "claseTipoVehiculo",
            type: "field"
          }
        ]
      });
    });

    it("debe retornar 400 cuando los datos son inválidos (claseTipoVehiculo vacío)", async () => {
      const datosInvalidos = {
        claseTipoVehiculo: ""
      };

      const respuesta = await request(app)
        .post("/api/tipovehiculo/add")
        .send(datosInvalidos);

      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toEqual({
        respuesta: [
          {
            location: "body",
            msg: "El nombre del tipo de vehículo es obligatorio",
            path: "claseTipoVehiculo",
            type: "field",
            value: ""
          },
          {
            location: "body",
            msg: "El nombre debe tener entre 3 y 50 caracteres",
            path: "claseTipoVehiculo",
            type: "field",
            value: ""
          }
        ]
      });
    });

    it("debe manejar errores de base de datos durante la creación", async () => {
      const nuevoTipoVehiculo = {
        claseTipoVehiculo: "Error Test"
      };

      (pool.task as jest.Mock).mockRejectedValueOnce(
        new Error("Error de inserción")
      );

      const respuesta = await request(app)
        .post("/api/tipovehiculo/add")
        .send(nuevoTipoVehiculo);

      expect(respuesta.status).toBe(500);
      expect(respuesta.body).toEqual({
        respuesta: "Error interno al crear tipo de vehículo"
      });
    });
  });

  /**
   * PRUEBAS PARA ACTUALIZAR UN TIPO DE VEHÍCULO
   *
   * Ruta: PUT /api/tipovehiculo/update
   * Descripción: Actualiza los datos de un tipo de vehículo existente
   */
  describe("PUT /api/tipovehiculo/update", () => {
    it("debe actualizar un tipo de vehículo exitosamente", async () => {
      const tipoVehiculoActualizado = {
        codTipoVehiculo: 1,
        claseTipoVehiculo: "Automóvil Actualizado"
      };

      // Mock para verificar que el tipo existe
      (pool.oneOrNone as jest.Mock).mockResolvedValueOnce({
        cod_tipo_vehiculo: 1,
        clase_tipo_vehiculo: "Automóvil"
      });

      // Mock para verificar que no existe otro con el mismo nombre
      (pool.one as jest.Mock).mockResolvedValueOnce({ cantidad: 0 });

      // Mock para la actualización
      (pool.result as jest.Mock).mockResolvedValueOnce({ rowCount: 1 });

      const respuesta = await request(app)
        .put("/api/tipovehiculo/update")
        .send(tipoVehiculoActualizado);

      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toEqual({
        respuesta: "Tipo de vehículo actualizado correctamente",
        detalles: {
          filasActualizadas: 1,
          codigoTipoVehiculo: 1,
          nuevoNombre: "Automóvil Actualizado"
        }
      });
    });

    it("debe retornar 404 cuando el tipo de vehículo no existe", async () => {
      const tipoVehiculoInexistente = {
        codTipoVehiculo: 999,
        claseTipoVehiculo: "Inexistente"
      };

      // Mock para verificar que el tipo no existe
      (pool.oneOrNone as jest.Mock).mockResolvedValueOnce(null);

      const respuesta = await request(app)
        .put("/api/tipovehiculo/update")
        .send(tipoVehiculoInexistente);

      expect(respuesta.status).toBe(404);
      expect(respuesta.body).toEqual({
        respuesta: "El tipo de vehículo no existe"
      });
    });

    it("debe retornar 409 cuando ya existe otro tipo con el mismo nombre", async () => {
      const tipoVehiculoConNombreDuplicado = {
        codTipoVehiculo: 1,
        claseTipoVehiculo: "Motocicleta"
      };

      // Mock para verificar que el tipo existe
      (pool.oneOrNone as jest.Mock).mockResolvedValueOnce({
        cod_tipo_vehiculo: 1,
        clase_tipo_vehiculo: "Automóvil"
      });

      // Mock para verificar que ya existe otro con el mismo nombre
      (pool.one as jest.Mock).mockResolvedValueOnce({ cantidad: 1 });

      const respuesta = await request(app)
        .put("/api/tipovehiculo/update")
        .send(tipoVehiculoConNombreDuplicado);

      expect(respuesta.status).toBe(409);
      expect(respuesta.body).toEqual({
        respuesta: "Ya existe un tipo de vehículo con este nombre"
      });
    });

    it("debe retornar 400 cuando los datos son inválidos", async () => {
      const datosInvalidos = {
        codTipoVehiculo: null,
        claseTipoVehiculo: ""
      };

      const respuesta = await request(app)
        .put("/api/tipovehiculo/update")
        .send(datosInvalidos);

      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toEqual({
        respuesta: [
          {
            location: "body",
            msg: "El código del tipo de vehículo es obligatorio",
            path: "codTipoVehiculo",
            type: "field",
            value: null
          },
          {
            location: "body",
            msg: "El código del tipo de vehículo debe ser numérico",
            path: "codTipoVehiculo",
            type: "field",
            value: null
          },
          {
            location: "body",
            msg: "El nombre del tipo de vehículo es obligatorio",
            path: "claseTipoVehiculo",
            type: "field",
            value: ""
          },
          {
            location: "body",
            msg: "El nombre debe tener entre 3 y 50 caracteres",
            path: "claseTipoVehiculo",
            type: "field",
            value: ""
          }
        ]
      });
    });

    it("debe retornar 500 cuando no se puede actualizar el registro", async () => {
      const tipoVehiculo = {
        codTipoVehiculo: 1,
        claseTipoVehiculo: "Test"
      };

      // Mock para verificar que el tipo existe
      (pool.oneOrNone as jest.Mock).mockResolvedValueOnce({
        cod_tipo_vehiculo: 1,
        clase_tipo_vehiculo: "Automóvil"
      });

      // Mock para verificar que no existe otro con el mismo nombre
      (pool.one as jest.Mock).mockResolvedValueOnce({ cantidad: 0 });

      // Mock para la actualización (sin filas afectadas)
      (pool.result as jest.Mock).mockResolvedValueOnce({ rowCount: 0 });

      const respuesta = await request(app)
        .put("/api/tipovehiculo/update")
        .send(tipoVehiculo);

      expect(respuesta.status).toBe(500);
      expect(respuesta.body).toEqual({
        respuesta: "No se pudo actualizar el tipo de vehículo"
      });
    });

    it("debe manejar errores de base de datos durante la actualización", async () => {
      const tipoVehiculo = {
        codTipoVehiculo: 1,
        claseTipoVehiculo: "Error Test"
      };

      (pool.oneOrNone as jest.Mock).mockRejectedValueOnce(
        new Error("Error de base de datos")
      );

      const respuesta = await request(app)
        .put("/api/tipovehiculo/update")
        .send(tipoVehiculo);

      expect(respuesta.status).toBe(500);
      expect(respuesta.body).toEqual({
        respuesta: "Error interno al actualizar el tipo de vehículo"
      });
    });
  });

  /**
   * PRUEBAS PARA ELIMINAR UN TIPO DE VEHÍCULO
   *
   * Ruta: DELETE /api/tipovehiculo/delete/:codTipoVehiculo
   * Descripción: Elimina un tipo de vehículo existente
   */
  describe("DELETE /api/tipovehiculo/delete/:codTipoVehiculo", () => {
    it("debe retornar 404 cuando el tipo de vehículo no existe", async () => {
      // Mock para verificar que el tipo no existe
      (pool.oneOrNone as jest.Mock).mockResolvedValueOnce(null);

      const respuesta = await request(app).delete("/api/tipovehiculo/delete/999");

      expect(respuesta.status).toBe(404);
      expect(respuesta.body).toEqual({
        respuesta: "El tipo de vehículo no existe"
      });
    });

    it("debe eliminar un tipo de vehículo exitosamente cuando no tiene vehículos asociados", async () => {
      // Mock para verificar que el tipo existe
      (pool.oneOrNone as jest.Mock).mockResolvedValueOnce({
        cod_tipo_vehiculo: 1,
        clase_tipo_vehiculo: "Test"
      });

      (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
        const mockClient = {
          oneOrNone: jest.fn(),
          result: jest.fn()
        };
        
        // Mock para verificar que no hay vehículos asociados
        mockClient.oneOrNone.mockResolvedValueOnce({ cantidad: 0 });
        
        // Mock para eliminar
        mockClient.result.mockResolvedValueOnce({ rowCount: 1 });

        const resultado = await callback(mockClient);
        return { caso: 3, filasBorradas: 1 };
      });

      const respuesta = await request(app).delete("/api/tipovehiculo/delete/1");

      expect(respuesta.status).toBe(200);
      expect(respuesta.body).toEqual({
        respuesta: "Tipo de vehículo eliminado correctamente",
        "Filas borradas": 1
      });
    });

    it("debe retornar error 400 cuando hay vehículos asociados", async () => {
      // Mock para verificar que el tipo existe
      (pool.oneOrNone as jest.Mock).mockResolvedValueOnce({
        cod_tipo_vehiculo: 1,
        clase_tipo_vehiculo: "Test"
      });

      (pool.task as jest.Mock).mockImplementationOnce(async (callback) => {
        const mockClient = {
          oneOrNone: jest.fn()
        };

        // Mock para verificar que hay vehículos asociados
        mockClient.oneOrNone.mockResolvedValueOnce({ cantidad: 3 });

        const resultado = await callback(mockClient);
        return { caso: 2, vehiculosAsociados: 3 };
      });

      const respuesta = await request(app).delete("/api/tipovehiculo/delete/1");

      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toEqual({
        respuesta: "No se puede eliminar este tipo de vehículo",
        detalle: "No se puede eliminar porque hay 3 vehículos asociados."
      });
    });

    it("debe manejar error de clave foránea específicamente", async () => {
      // Mock para verificar que el tipo existe
      (pool.oneOrNone as jest.Mock).mockResolvedValueOnce({
        cod_tipo_vehiculo: 1,
        clase_tipo_vehiculo: "Test"
      });

      const errorClaveForanea = {
        code: "23503",
        constraint: "fk_vehiculo_ref_tiposvehi",
        message: "violates foreign key constraint"
      };

      (pool.task as jest.Mock).mockRejectedValueOnce(errorClaveForanea);

      const respuesta = await request(app).delete("/api/tipovehiculo/delete/1");

      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toEqual({
        respuesta: "No se puede eliminar este tipo de vehículo",
        detalle: "No se puede eliminar porque hay vehículos asociados.",
        codigoError: "23503"
      });
    });

   
  });
});
