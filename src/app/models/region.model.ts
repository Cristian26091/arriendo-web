export class Region {
    constructor(_id = '', numero = '', nombre_region = '', comunas = []){
        this._id = _id;
        this.numero = numero;
        this.nombre_region = nombre_region;
        this.comunas = comunas;
    }
    _id: String;
    numero: String;
    nombre_region: String;
    comunas: any[] = [];

}
