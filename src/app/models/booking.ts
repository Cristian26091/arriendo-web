export class Booking {
    constructor(
        fecha_inicio: null, fecha_fin: null, usuario_id: ''
    ){
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.usuario_id = usuario_id;
    }
    
    fecha_inicio: Date;
    fecha_fin: Date;
    usuario_id: string;
}
