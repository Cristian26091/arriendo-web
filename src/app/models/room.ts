export class Room {

    constructor(_id='', id_region='', latitud=0, longitud=0, banio_compartido=null, 
    descripcion='', fecha_publicacion = null, region = '', ciudad = '',
    comuna = '', calle = '', numero = '', casa_depto = '', precio = '', url_image_cover = '', esta_arrendado = '',
    url_model = '', url_texture = ''
    ){
        this._id = _id;
        this.id_region = id_region;
        this.latitud = latitud;
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
        this.url_image_cover = url_image_cover;
        this.url_model = url_model;
        this.url_texture = url_texture;
        this.esta_arrendado = esta_arrendado;
    }

    _id: string;
    id_region: String
    latitud: Number
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
    url_image_cover: String
    url_model: String
    url_texture: String
    esta_arrendado: String
}
