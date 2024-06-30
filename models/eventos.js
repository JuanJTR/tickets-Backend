import mongoose from 'mongoose';

const eventoSchema = new mongoose.Schema({
    EventoID: {
        type: Number,
        // required: true,
        unique: true
    },
    Titulo: {
        type: String,
        required: true,
        maxlength: 100
    },
    Descripcion: {
        type: String,
        required: true
    },
    FechaEvento: {
        type: Date,
        required: true
    },
    Ubicacion: {
        type: String,
        required: true,
        maxlength: 255
    },
    UsuarioID: {
        type: Number,
        ref: 'User',
        required: true
    }
});

// Middleware para generar EventoID automáticamente
eventoSchema.pre('save', async function (next) {
    if (!this.EventoID) {
        try {
            const lastEvento = await this.constructor.findOne({}, {}, { sort: { 'EventoID': -1 } });
            this.EventoID = lastEvento ? lastEvento.EventoID + 1 : 1;

        } catch (error) {
            console.error('Error al generar EventoID:', error);
            return next(error);
        }
    }
    next();
});
const coleccion = 'Evento'
const Evento = mongoose.model(coleccion, eventoSchema);
export default Evento;