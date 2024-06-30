const mongoose = require('mongoose');

const contadorSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

const coleccion = 'DriverId'
const DriverId = mongoose.model(coleccion, contadorSchema);//envia la data a la "coleccion" o tabla
// module.exports = DriverId;
export default DriverId;