import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Conectar a MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Eliminar TODOS los juegos (para limpiar completamente)
const limpiarJuegos = async () => {
    try {
        await connectDB();
        
        const Juego = mongoose.model('Juego', new mongoose.Schema({}, { strict: false }));
        
        // Contar todos los juegos antes
        const total = await Juego.countDocuments();
        console.log(`📊 Total de juegos en la base de datos: ${total}`);
        
        // Mostrar algunos juegos antes de eliminar
        const muestraAntes = await Juego.find({}, { _id: 1, titulo: 1, usuario: 1 }).limit(5);
        console.log('\n🎮 Muestra de juegos ANTES:');
        muestraAntes.forEach(j => {
            console.log(`  - ${j.titulo} (ID: ${j._id}) - Usuario: ${j.usuario || '❌ SIN USUARIO'}`);
        });
        
        // ELIMINAR TODOS LOS JUEGOS (opción nuclear)
        console.log('\n⚠️  Eliminando TODOS los juegos de la base de datos...');
        const resultado = await Juego.deleteMany({});

        console.log(`✅ Se eliminaron ${resultado.deletedCount} juegos`);
        
        // Contar juegos restantes
        const restantes = await Juego.countDocuments();
        console.log(`📊 Juegos restantes: ${restantes}`);
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al limpiar juegos:', error);
        process.exit(1);
    }
};

limpiarJuegos();
