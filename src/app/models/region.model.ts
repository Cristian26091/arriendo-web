export class Region {
    constructor(_id = '', id_region = '', nombre_region = '', comunas = []){
        this._id = _id;
        this.id_region = id_region;
        this.nombre_region = nombre_region;
        this.comunas = comunas;
    }
    _id: String;
    id_region: String;
    numero: Number;
    nombre_region: String;
    comunas: any[] = [];

}
