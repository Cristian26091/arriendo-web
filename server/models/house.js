const mongoose = require('mongoose');

const { Schema } = mongoose;

const HouseSchema = new Schema({
    fecha_publicacion: { type: Date, required: true },
    fecha_termino: { type: Date, required: true },
    precio: { type: String, required: true },
    duenio: { type: String, required: true },
    nombrePropiedad: { type: String, required: true },
    numHabitaciones: { type: Number, required: true },
    numBanios: { type: Number, required: true },
    tieneEstacionamiento: { type: Boolean, required: true },
    region: { type: String, required: true },
    comuna: { type: String, required: true },
    calle: { type: String, required: true },
});



module.exports =  mongoose.model('house', HouseSchema);