
export class User {
    constructor(
      _id = '', nombre = '', apellido = '', rut = '', fecha_nacimiento = '', 
      telefono = '', email= '', pass = '', role = '', token = '', genero = '',
      ocupacion = '', tipo_actividad = '', pais = '', intereses = [],
    ) {
        this._id = _id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.rut = rut;
        this.fecha_nacimiento = fecha_nacimiento;
        this.telefono = telefono;
        this.email = email;
        this.pass = pass;
        this.role = role;
        this.token = token;
        this.ocupacion = ocupacion;
        this.tipo_actividad = tipo_actividad;
        this.pais = pais;
        this.intereses = intereses;
        this.genero = genero;
    }
    _id: string;
    nombre: string;
    apellido: string;
    rut: string;
    fecha_nacimiento: string;
    telefono: string;
    email: string;
    pass: string;
    role: string;
    token: string;
    genero: string;
    ocupacion: string;
    tipo_actividad: string;
    pais: string;
    intereses: string[];
  }