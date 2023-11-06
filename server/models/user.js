const mongoose = require('mongoose');

const { Schema } = mongoose;

 const UserSchema = new Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    email: { type: String, required: true },
    rut: {type: String, required: true},
    telefono: { type: String, required: true },
    pass: {type: String, required: true},
    fecha_nacimiento: { type: String, required: true },
    genero: {type: String, required: true},
    ocupacion: {type: String, required: true},
    tipo_actividad: {type: String, required: true},
    pais: {type: String, required: true},
    intereses: { type: [String], required: true }, // Cambiar el tipo a Array de Strings
    role: {type: String, required: true},

    token: {type: String, required: false},
  
});

module.exports =  mongoose.model('user', UserSchema);