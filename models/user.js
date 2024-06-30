// const mongoose = require('mongoose');
// const DriverId = require('./driver-id');
import mongoose from 'mongoose';
import DriverId from './driver-id.js';

// Definir el esquema
const usuarioSchema = new mongoose.Schema({
    UsuarioID: {
        type: Number,
        // required: true,
        unique: true
    },
    Nombre: {
        type: String,
        required: true,
        maxlength: 100
    },
    CorreoElectronico: {
        type: String,
        required: true,
        // unique: true,
        maxlength: 100
    },
    Contraseña: {
        type: String,
        required: true,
        maxlength: 255
    },
    FechaRegistro: {
        type: Date,
        default: Date.now
    }
});

// Middleware para generar UsuarioID automáticamente
usuarioSchema.pre('save', async function (next) {
    if (!this.UsuarioID) {
        try {
            const contador = await DriverId.findOneAndUpdate(
                { _id: 'usuarioId' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            this.UsuarioID = contador.seq;
            console.log('Generated UsuarioID:', this.UsuarioID);
        } catch (error) {
            console.error('Error al generar UsuarioID:', error);
            return next(error);
        }
    }
    next();
});
// usuarioSchema.pre('save', async function (next) {
//     if (!this.UsuarioID) {
//         const contador = await Contador.findByIdAndUpdate(
//             { _id: 'usuarioId' },
//             { $inc: { seq: 1 } },
//             { new: true, upsert: true }
//         );
//         this.UsuarioID = contador.seq;
//     }
//     next();
// });
// Crear el modelo
const coleccion = 'User'
const User = mongoose.model(coleccion, usuarioSchema); //envia la data a la "coleccion" o tabla
export default User;
// module.exports = Usuario;