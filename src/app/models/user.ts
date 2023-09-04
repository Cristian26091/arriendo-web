
export class User {
    constructor(
      nombre = '', apellido = '', rut = '', fecha_nacimiento = '', 
      telefono = '', email= '', pass = ''
    ) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.rut = rut;
        this.fecha_nacimiento = fecha_nacimiento;
        this.telefono = telefono;
        this.email = email;
        this.pass = pass;
    }
  
    nombre: string;
    apellido: string;
    rut: string;
    fecha_nacimiento: string;
    telefono: string;
    email: string;
    pass: string;
  }