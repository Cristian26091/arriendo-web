const mongoose = require('mongoose');

const { Schema } = mongoose;

 const RoomSchema = new Schema({
    id_region : {type: String, required: false},
    latitude: {type: Number, required: true},
    longitud: {type: Number, required: true},
    banio_compartido: { type: Boolean, required: true },
    descripcion: { type: String, required: true },
    fecha_publicacion: { type: Date, required: true },
    region: {type: String, required: true},
    ciudad: {type: String, required: false},
    comuna: {type: String, required: true},
    calle: {type: String, required: true},
    numero: {type: String, required: true},
    casa_depto: {type: String, required: true},
    precio: {type: Number, required: true},
    esta_arrendado: {type: String, required: true},
    url_img_cover: {type: String, required: true},
    url_model: {type: String, required: true},
    model_ref_bucket: {type: String, required: true},
    url_texture: {type: String, required: true},
    texture_ref_bucket: {type: String, required: true},
    url_model_LQ: {type: String, required: true},
    model_LQ_ref_bucket: {type: String, required: true},
    url_texture_LQ: {type: String, required: true},
    texture_LQ_ref_bucket: {type: String, required: true},

    reservas: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }],
    bucket_ref_imgs: [{
        nombre: String,
        url: String
    }]

    //campo para gestion de reservas
    // reservas: [
    //     {
    //         fecha_inicio: { type: Date, required: true },
    //         fecha_fin: { type: Date, required: true },
    //         usuario_id: { type: String, required: true }, // ID del usuario que hizo la reserva
    //     }
    // ]
});

module.exports =  mongoose.model('room', RoomSchema);