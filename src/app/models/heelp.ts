export class Help {
  
    constructor(nombre = '', descripcion = '', url_image = '', faqs=[]) {
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.url_image = url_image;
      this.faqs = faqs;
    }

    nombre: String;
    descripcion: String;
    url_image: String;
    faqs: any[] = [];
  }
  