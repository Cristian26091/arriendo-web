const mongoose = require('mongoose');

const { Schema } = mongoose;

 const UserSchema = new Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    rut: {type: String, required: true},
    fecha_nacimiento: { type: String, required: true },
    telefono: { type: String, required: true },
    email: { type: String, required: true },
    pass: {type: String, required: true},
    role: {type: String, required: true},
    token: {type: String, required: false},
  
});

module.exports =  mongoose.model('user', UserSchema);