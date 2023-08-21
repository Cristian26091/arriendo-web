const mongoose = require('mongoose');

const { Schema } = mongoose;

 const UserSchema = new Schema({
    id_: {type: String, required: true},
    nombre: {type: String, required: true},
    rut: {type: String, required: true},
    fecha_nacimiento: { type: Date, required: true },
    telefono: { type: String, required: true },
    email: { type: String, required: true },
    pass: {type: String, required: true},
  
});

module.exports =  mongoose.model('user', UserSchema);