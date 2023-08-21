
export class User {
    constructor(
      _id = '', nombre = '', rut = '', fecha_nacimiento = null, 
      telefono = '', email= '', pass = ''
    ) {
        this._id = _id;
        this.nombre = nombre;
        this.rut = rut;
        this.fecha_nacimiento = fecha_nacimiento;
        this.telefono = telefono;
        this.email = email;
        this.pass = pass;
    }
  
    _id: string;
    nombre: string;
    rut: string;
    fecha_nacimiento: string;
    telefono: string;
    email: string;
    pass: string;
  }