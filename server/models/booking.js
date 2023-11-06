const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    fecha_inicio: { type: Date, required: true },
    fecha_fin: { type: Date, required: true },
    fecha_creacion: { type: Date, required: true },
    estado: { type: String, required: true },
    precio: { type: Number, required: true },
    pdf: { type: String, required: true },
    url_pdf_user: { type: String, required: true },
    ref_pdf_user: { type: String, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
