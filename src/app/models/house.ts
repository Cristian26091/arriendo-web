export class House {

    constructor(_id= '',fecha_publicacion = null, precio = '', duenio = '', fecha_termino = null, nombrePropiedad = '',
     numHabitaciones = null, numBanios = null, tieneEstacionamiento = null, region = '', comuna = '', calle = '') {
        _id = '';
        this.fecha_publicacion = fecha_publicacion;
        this.fecha_termino = fecha_termino;
        this.precio = precio;
        this.duenio = duenio;
        this.nombrePropiedad = nombrePropiedad;
        this.numHabitaciones = numHabitaciones;
        this.numBanios = numBanios;
        this.tieneEstacionamiento = tieneEstacionamiento;
        this.region = region;
        this.comuna = comuna;
        this.calle = calle;
    }

    _id: String;
    fecha_publicacion: Date;
    fecha_termino: Date;
    precio: String;
    duenio: String 
    nombrePropiedad: String;
    numHabitaciones: Number;
    numBanios: Number;
    tieneEstacionamiento: Boolean;
    region: String;
    comuna: String;
    calle: String;
}
