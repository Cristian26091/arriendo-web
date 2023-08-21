const mongoose = require('mongoose');

const { Schema } = mongoose;

 const RoomSchema = new Schema({
    id_region : {type: String, required: true},
    latitude: {type: Number, required: true},
    longitud: {type: Number, required: true},
    banio_compartido: { type: Boolean, required: true },
    descripcion: { type: String, required: true },
    fecha_publicacion: { type: Date, required: true },
    region: {type: String, required: true},
    ciudad: {type: String, required: true},
    comuna: {type: String, required: true},
    calle: {type: String, required: true},
    numero: {type: String, required: true},
    casa_depto: {type: String, required: true},
    precio: {type: Number, required: true},
    esta_arrendado: {type: String, required: true},
    url_img_cover: {type: String, required: true},
    url_model: {type: String, required: true},
    url_texture: {type: String, required: true},
});

module.exports =  mongoose.model('room', RoomSchema);