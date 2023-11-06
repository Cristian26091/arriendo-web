export class Service {
    constructor(
      _id = '', nombre = '', descripcion = '', precio = 0, imagen = '',
    ) {
        this._id = _id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
    }
    _id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
}
