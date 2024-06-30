import mongoose from 'mongoose';

const entradaSchema = new mongoose.Schema({
    EntradaID: {
        type: Number,
        // required: true,
        unique: true
    },
    EventoID: {
        type: Number,
        required: true,
        ref: 'Evento'
    },
    UsuarioID: {
        type: Number,
        required: true,
        ref: 'User'
    },
    FechaCompra: {
        type: Date,
        default: Date.now
    },
    Cantidad: {
        type: Number,
        required: true,
        min: 1
    },
    Precio: {
        type: Number,
        required: true,
        min: 0
    }
});

// Middleware para generar EntradaID automáticamente
entradaSchema.pre('save', async function (next) {
    if (!this.EntradaID) {
        try {
            const lastEntrada = await this.constructor.findOne({}, {}, { sort: { 'EntradaID': -1 } });
            this.EntradaID = lastEntrada ? lastEntrada.EntradaID + 1 : 1;

        } catch (error) {
            console.error('Error al generar EntradaID:', error);
            return next(error);
        }
    }
    next();
});

// Índice compuesto para UsuarioID y EventoID
entradaSchema.index({ UsuarioID: 1, EventoID: 1 });

const coleccion = 'Entrada'
const Entrada = mongoose.model(coleccion, entradaSchema);
export default Entrada;