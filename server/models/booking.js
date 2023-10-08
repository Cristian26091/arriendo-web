const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
    fecha_inicio: Date,
    fecha_fin: Date,
    usuario_id: String
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
