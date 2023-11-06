const mongoose = require('mongoose');

const { Schema } = mongoose;

const ServiceSchema = new Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    precio: {type: Number, required: true},
    imagen: {type: String, required: true},
});

module.exports =  mongoose.model('service', ServiceSchema);