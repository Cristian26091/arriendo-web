export class Booking {
    constructor(
        _id: '', userId: '', roomId = '', fecha_inicio: null, fecha_fin: null, fecha_creacion: null, estado: '', precio = 0, pdf = '', url_pdf_user = '', ref_pdf_user = '',
        precio_servicio = 0, precio_total = 0
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
        this.url_pdf_user = this.url_pdf_user;
        this.ref_pdf_user = this.ref_pdf_user;
        this.precio_servicio = precio_servicio;
        this.precio_total = precio_total;
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
    url_pdf_user : string;
    ref_pdf_user : string;
    precio_servicio : number;
    precio_total : number;
    
}
