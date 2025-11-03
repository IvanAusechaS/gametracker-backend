import express from "express";
import {
  registrarUsuario,
  loginUsuario,
  logoutUsuario,
  obtenerPerfil,
} from "../controllers/usuarioController.js";
import { verificarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rutas públicas (no requieren autenticación)
router.post("/register", registrarUsuario);
router.post("/login", loginUsuario);

// Rutas privadas (requieren autenticación)
router.post("/logout", verificarToken, logoutUsuario);
router.get("/perfil", verificarToken, obtenerPerfil);

export default router;
