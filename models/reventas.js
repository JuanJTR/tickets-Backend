import mongoose from "mongoose";

const reventaSchema = new mongoose.Schema({
    ReventaID: {
        type: Number,
        unique: true
        // required: true,
    },
    EventoID: {
        type: Number,
        required: true,
        ref: 'Evento'
    },
    EntradaID: {
        type: Number,
        required: true,
        ref: 'Entrada'
    },
    VendedorID: {
        type: Number,
        required: true,
        ref: 'User'
    },
    CompradorID: {
        type: Number,
        // required: true,
        ref: 'User'
    },
    FechaReventa: {
        type: Date,
        default: Date.now
    },
    Precio: {
        type: Number,
        required: true,
        min: 0
    },
    Vendido: {
        type: Boolean,
        default: false
    }
});

reventaSchema.pre('save', async function (next) {
    if (!this.ReventaID) {
        try {
            const lastReventa = await this.constructor.findOne({}, {}, { sort: { 'EntradaID': -1 } });
            this.ReventaID = lastReventa ? lastReventa.ReventaID + 1 : 1;

        } catch (error) {
            console.error('Error al generar ReventaID:', error);
            return next(error);
        }
    }
    next();
});

// Índice compuesto para UsuarioID y EventoID
// entradaSchema.index({ VendedorID: 1, EntradaID: 1 });

const coleccion = 'Reventa'
const Reventa = mongoose.model(coleccion, reventaSchema);
export default Reventa;