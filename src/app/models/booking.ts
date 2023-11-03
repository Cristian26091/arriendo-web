export class Booking {
    constructor(
        _id: '', userId: '', roomId = '', fecha_inicio: null, fecha_fin: null, fecha_creacion: null, estado: '', precio = 0, pdf = '',
    ){
        this._id = _id;
        this.userId = userId;
        this.roomId = roomId;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.fecha_creacion = fecha_creacion;
        this.estado = estado;
        this.precio = precio;
        this.pdf = this.pdf;
    }
    
    _id: string;
    userId: string;
    roomId: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    fecha_creacion: Date;
    estado : string;
    precio : number;
    pdf : string;
    
}
