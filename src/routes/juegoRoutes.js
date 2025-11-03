import express from "express"
import { obtenerJuegos, agregarJuego, actualizarJuego,eliminarJuego } from "../controllers/juegoController.js"
import { verificarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Todas las rutas de juegos requieren autenticación
router.get("/", verificarToken, obtenerJuegos);
router.post("/", verificarToken, agregarJuego);
router.put("/:id", verificarToken, actualizarJuego);
router.delete("/:id", verificarToken, eliminarJuego);

export default router;