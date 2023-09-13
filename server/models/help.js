const mongoose = require('mongoose');
const { Schema } = mongoose;

const HelpSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    image: { type: String, required: true },
    faqs: [
        {
            pregunta: { type: String, required: true },
            respuesta: { type: String, required: true }
        }
    ]
});

module.exports = mongoose.model('help', HelpSchema);