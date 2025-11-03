import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

// Middleware para verificar el token JWT desde las cookies
export const verificarToken = async (req, res, next) => {
  try {
    // Obtener el token de las cookies
    const token = req.cookies.token;

    // Verificar si el token existe
    if (!token) {
      return res.status(401).json({
        mensaje: "No autorizado. No se proporcionó token de autenticación",
      });
    }

    // Verificar y decodificar el token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secreto_super_seguro"
    );

    // Buscar el usuario en la base de datos (sin incluir la contraseña)
    const usuario = await Usuario.findById(decoded.id).select("-password");

    if (!usuario) {
      return res.status(401).json({
        mensaje: "No autorizado. Usuario no encontrado",
      });
    }

    console.log('🔐 Usuario autenticado:', usuario._id.toString(), '-', usuario.email);

    // Agregar el usuario al objeto request
    req.usuario = {
      id: usuario._id.toString(), // Convertir ObjectId a string
      nombre: usuario.nombre,
      email: usuario.email,
    };

    // Continuar con el siguiente middleware o controlador
    next();
  } catch (error) {
    console.error("Error en verificarToken:", error);

    // Manejar diferentes tipos de errores de JWT
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        mensaje: "Token inválido",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        mensaje: "Token expirado. Por favor inicie sesión nuevamente",
      });
    }

    res.status(500).json({
      mensaje: "Error al verificar autenticación",
      error: error.message,
    });
  }
};
