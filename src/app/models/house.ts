export class House {

    constructor(_id= '',fecha_publicacion = null, precio = '', duenio = '', fecha_termino = null) {
        _id = '';
        this.fecha_publicacion = fecha_publicacion;
        this.fecha_termino = fecha_termino;
        this.precio = precio;
        this.duenio = duenio;

    }

    _id: String;
    fecha_publicacion: Date;
    fecha_termino: Date;
    precio: String;
    duenio: String 

}
