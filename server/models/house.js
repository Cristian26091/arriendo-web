const mongoose = require('mongoose');

const { Schema } = mongoose;

const HouseSchema = new Schema({
    fecha_publicacion: { type: Date, required: true },
    fecha_termino: { type: Date, required: true },
    precio: { type: String, required: true },
    duenio: { type: String, required: true },
    nombrePropiedad: { type: String, required: true },
    numPisos: { type: Number, required: true },
});



module.exports =  mongoose.model('house', HouseSchema);