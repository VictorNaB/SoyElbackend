import { Response } from "express";
import Accesos from "../model/Accesos";
import pool from "../../../config/connection/dbConnetions";
import { sql_Accesos } from "../repository/Sql_Accesos";

class ServicioActualizarAcceso {
  protected static async ActualizarAcceso(obj: Accesos, res: Response) {
    await pool
      .task(async (consulta) => {
        let caso = 1;
        let objGrabado: any;
        const access: any = await consulta.oneOrNone(sql_Accesos.getById, [
          obj.codUsuario,
        ]);
        if (access == null) {
          caso = 2;
        } else {
          objGrabado = await consulta.none(sql_Accesos.UPDATE, [
            obj.codUsuario,
            obj.correo,
            obj.clave,
            obj.uuid,
          ]);
        }
        return { caso, objGrabado };
      })
      .then(({ caso, objGrabado }) => {
        switch (caso) {
          case 2:
            res
              .status(400)
              .json({ respuesta: "El acceso no existe en la base de datos" });
            break;
          default:
            res.status(200).json({
              respuesta: "Acceso actualizado correctamente",
              detalle: objGrabado,
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

        // Verificar si el acceso existe
        const access = await consulta.oneOrNone(sql_Accesos.getById, [
          obj.codUsuario,
        ]);

        if (!access) {
          return {
            caso: 2,
            mensaje: "No existe un acceso registrado para este usuario"
          };
        }

        // Verificar si el correo ya está en uso por otro usuario
        const correoEnUso = await consulta.oneOrNone(
          sql_Accesos.getByCorreoExcludingId,
          [obj.correo, obj.codUsuario]
        );

        if (correoEnUso) {
          return {
            caso: 3,
            mensaje: "El correo electrónico ya está en uso por otro usuario"
          };
        }

        // Realizar la actualización
        const objGrabado = await consulta.none(sql_Accesos.UPDATE, [
          obj.codUsuario,
          obj.correo,
          obj.clave,
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
            res.status(200).json({
              status: "success",
              message: "Acceso actualizado correctamente"

            });
            break;
        }
      })

      .catch((error) => {
        console.log(error);
        res.status(400).json({
          respuesta: "Error al actualizar el acceso",
          detalle: error.message,
      .catch((miError) => {
        if (miError.code === "23503") {
          return res.status(404).json({
            status: "error",
            message: "Error: El usuario referenciado no existe",
            detail: miError.detail
          });
        }

        return res.status(500).json({
          status: "error",
          message: "Error al actualizar el acceso",
          detail: miError.message
        });
      });
  }
}

export default ServicioActualizarAcceso;

