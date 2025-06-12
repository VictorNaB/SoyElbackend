<<<<<<< HEAD
import { Response, Request } from "express";
import pool from "../../../config/connection/dbConnetions";
import Accesos from "../model/Accesos";
import { sql_Accesos } from "../repository/Sql_Accesos";
=======
import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import Accesos from "../model/Accesos";
import { sql_Accesos } from "../repository/Sql_Accesos";
import bcrypt from "bcryptjs";
>>>>>>> 62f9d91 (Cambios realizados)

class ServicioCrearAccesos {
  protected static async crearAcceso(obj: Accesos, res: Response) {
    await pool
      .task(async (consulta) => {
<<<<<<< HEAD
        let caso = 1;
        let objGrabado: any;
        const usuarioExiste = await consulta.oneOrNone(
          sql_Accesos.getByUserId,
          [obj.codUsuario]
        );
        if (!usuarioExiste) {
          caso = 3;
        }else{
            const access: any = await consulta.oneOrNone(sql_Accesos.getById, [
              obj.codUsuario,
            ]);
            if (access != null) {
              caso = 2;
            }

            if(access ==  null){
              caso =4;
              objGrabado = await consulta.one(sql_Accesos.ADD, [
                obj.codUsuario,
                obj.correo,
                obj.clave,
                obj.uuid,
              ]);
          }
            }
            
        return { caso, objGrabado };
      })
      .then(({ caso, objGrabado }) => {
        switch (caso) {
          case 2:
            res
              .status(400)
              .json({ respuesta: "Ya se encuentra registrado ese usuario" });
            break;
          case 3:
            res
              .status(400)
              .json({ respuesta: "El usuario no existe en la base de datos" });
            break
          case 4:
            res.status(200).json({objGrabado});
          default:

=======
        // Verificar si el usuario existe en la tabla usuarios
        const usuarioExiste = await consulta.oneOrNone(
          sql_Accesos.getUserById,
          [obj.codUsuario]
        );

        if (!usuarioExiste) {
          return {
            caso: 1,
            mensaje: "El usuario no existe en la base de datos"
          };
        }

        // Verificar si ya existe un acceso para este usuario
        const access = await consulta.oneOrNone(sql_Accesos.getById, [
          obj.codUsuario,
        ]);

        if (access) {
          return {
            caso: 2,
            mensaje: "Ya existe un acceso registrado para este usuario"
          };
        }

        // Verificar si el correo ya está en uso
        const correoEnUso = await consulta.oneOrNone(
          sql_Accesos.getByCorreo,
          [obj.correo]
        );

        if (correoEnUso) {
          return {
            caso: 3,
            mensaje: "El correo electrónico ya está en uso"
          };
        }

        // Cifrar la contraseña
        const clavecifrada = bcrypt.hashSync(obj.clave, 10);

        // Crear el acceso
        const objGrabado = await consulta.one(sql_Accesos.ADD, [
          obj.codUsuario,
          obj.correo,
          clavecifrada,
          obj.uuid,
        ]);

        return {
          caso: 4,
          objGrabado
        };
      })
      .then((result) => {
        switch (result.caso) {
          case 1:
          case 2:
          case 3:
            res.status(404).json({
              status: "error",
              message: result.mensaje
            });
            break;
          case 4:
            res.status(201).json({
              status: "success",
              message: "Acceso creado correctamente",
              data: result.objGrabado
            });
>>>>>>> 62f9d91 (Cambios realizados)
            break;
        }
      })
      .catch((error) => {
<<<<<<< HEAD
        console.log(error);
        res.status(400).json({ respuesta: "Error al crear el acceso" });
=======
        if (error.code === "23503") {
          return res.status(404).json({
            status: "error",
            message: "Error: El usuario referenciado no existe",
            detail: error.detail
          });
        }

        return res.status(500).json({
          status: "error",
          message: "Error al crear el acceso",
          detail: error.message
        });
>>>>>>> 62f9d91 (Cambios realizados)
      });
  }
}

export default ServicioCrearAccesos;
