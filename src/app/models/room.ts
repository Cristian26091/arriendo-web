import { model } from 'mongoose';
import { Booking } from './booking'; // Importamos el modelo de reserva
import { ImageRef } from './image-ref'; // Importamos el modelo de referencia de imagen

export class Room {
    constructor(_id='', id_region='', latitude=0, longitud=0, banio_compartido=null, 
    descripcion='', fecha_publicacion = null, region = '', ciudad = '',
    comuna = '', calle = '', numero = '', casa_depto = '', precio = '', esta_arrendado = '',
    url_model = '', url_texture = '', model_ref_bucket = '', texture_ref_bucket = '', reservas = [],
    imgRefs = [], url_image_cover = '', url_model_LQ = '', url_texture_LQ = '', model_ref_bucket_LQ = '', texture_ref_bucket_LQ = ''
    ){
        this._id = _id;
        this.id_region = id_region;
        this.latitude = latitude;
        this.longitud = longitud;
        this.banio_compartido = banio_compartido;
        this.descripcion = descripcion;
        this.fecha_publicacion = fecha_publicacion;
        this.region = region;
        this.ciudad = ciudad;
        this.comuna = comuna;
        this.calle = calle;
        this.numero = numero;
        this.casa_depto = casa_depto;
        this.precio = precio;
        this.url_model = url_model;
        this.url_texture = url_texture;
        this.model_ref_bucket = model_ref_bucket;
        this.texture_ref_bucket = texture_ref_bucket;
        this.esta_arrendado = esta_arrendado;
        this.reservas = reservas; // Campo para gestionar reservas
        this.bucket_ref_imgs = imgRefs; // Campo para gestionar imágenes
        this.url_img_cover = url_image_cover;
        this.url_model_LQ = url_model_LQ;
        this.model_ref_bucket_LQ = model_ref_bucket_LQ;
        this.texture_ref_bucket_LQ = texture_ref_bucket_LQ;
        this.url_texture_LQ = url_texture_LQ;

    }

    _id: string;
    id_region: String
    latitude: Number
    longitud: Number
    banio_compartido: Boolean
    descripcion: String
    fecha_publicacion: Date
    region: String
    ciudad: String
    comuna: String
    calle: String
    numero: String
    casa_depto: String
    precio: String
    esta_arrendado: String
    url_img_cover: String
    url_model: String
    url_texture: String
    model_ref_bucket: String
    texture_ref_bucket: String
    reservas: Booking[]; // Cambiamos el tipo de dato a un array de objetos Reserva
    bucket_ref_imgs: ImageRef[]; // Cambiamos el tipo de dato a un array de objetos ImageRef
    url_model_LQ: String
    url_texture_LQ: String
    model_ref_bucket_LQ: String
    texture_ref_bucket_LQ: String
}
