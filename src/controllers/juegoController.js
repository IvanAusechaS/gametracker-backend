import Juego from '../models/Juego.js';

// @desc    Obtener todos los juegos del usuario autenticado
// @route   GET /api/juegos
// @access  Privado
export const obtenerJuegos = async (req, res) => {
    try{
        // Solo obtener juegos del usuario autenticado
        const juegos = await Juego.find({ usuario: req.usuario.id });
        res.json(juegos);
    }catch(error){
        console.error("Error al obtener juegos:", error);
        res.status(500).json({mensaje: "Error al obtener los juegos"})
    }
};

// @desc    Agregar un nuevo juego
// @route   POST /api/juegos
// @access  Privado
export const agregarJuego = async (req, res) => {
    try{
        // Agregar el ID del usuario al juego
        const nuevoJuego = new Juego({
            ...req.body,
            usuario: req.usuario.id, // Asignar el usuario autenticado
        });
        const guardado = await nuevoJuego.save();
        res.json(guardado);
    }catch(error){
        console.error("Error al agregar juego:", error);
        res.status(500).json({mensaje: "Error al agregar el juego"})
    }
};

// @desc    Actualizar un juego
// @route   PUT /api/juegos/:id
// @access  Privado
export const actualizarJuego = async (req, res) => {
    try{
        // Buscar el juego
        const juego = await Juego.findById(req.params.id);
        
        if (!juego) {
            return res.status(404).json({ mensaje: "Juego no encontrado" });
        }

        // Verificar que el juego pertenezca al usuario autenticado
        if (juego.usuario.toString() !== req.usuario.id) {
            return res.status(403).json({ 
                mensaje: "No tienes permiso para actualizar este juego" 
            });
        }

        // Actualizar el juego
        const juegoActualizado = await Juego.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(juegoActualizado);
    }catch(error){
        console.error("Error al actualizar juego:", error);
        res.status(500).json({mensaje: "Error al actualizar el juego"})
    }
};

// @desc    Eliminar un juego
// @route   DELETE /api/juegos/:id
// @access  Privado
export const eliminarJuego = async (req, res) => {
    try{
        // Buscar el juego
        const juego = await Juego.findById(req.params.id);
        
        if (!juego) {
            return res.status(404).json({ mensaje: "Juego no encontrado" });
        }

        // Verificar que el juego pertenezca al usuario autenticado
        if (juego.usuario.toString() !== req.usuario.id) {
            return res.status(403).json({ 
                mensaje: "No tienes permiso para eliminar este juego" 
            });
        }

        await Juego.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "El juego se eliminó correctamente" });
    }catch(error){
        console.error("Error al eliminar juego:", error);
        res.status(500).json({mensaje: "Error al eliminar el juego"})
    }
};