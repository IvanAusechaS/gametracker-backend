import mongoose from "mongoose";

const juegoSchema = new mongoose.Schema({
    titulo: {
        type : String,
        required: true,
    },
    genero:{
        type: String,
        required: true,
    },
    horasJugadas:{
        type: Number,
        default:0,
    },
    estado:{
        type: Boolean,
        default: false,
    },
    portada:{
        type: String,
        required: false,
    },
    calificacion:{
        type: Number,
        default: 0,
    },
    // Referencia al usuario propietario del juego
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
}, {
    timestamps: true, // Agrega createdAt y updatedAt
});

const Juego = mongoose.model("Juego", juegoSchema);

export default Juego;