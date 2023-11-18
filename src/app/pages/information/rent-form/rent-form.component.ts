import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking.service';
import { RoomService } from 'src/app/services/room.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { Room } from 'src/app/models/room';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-rent-form',
  templateUrl: './rent-form.component.html',
  styleUrls: ['./rent-form.component.css']
})
export class RentFormComponent implements OnInit {

  fechaInicio: Date = null;
  fechaTermino: Date = null;
  aceptaTerminos: boolean = false;
  cantidadMeses: number = 0;

  //errores
  errorMessages = {
    fechaInicio: '',
    // fechaTermino: '',
    aceptaTerminos: '',
    cantidadMeses: '',
  };

  constructor(private router: Router, private bookingService: BookingService, private userService: UserService, private roomService: RoomService) { }

  ngOnInit(): void {
    this.userService.loadUserFromCookies().subscribe(
      (user: User) => {
        this.userService.selectedUser = user;
        console.log("el usuario es: ", this.userService.selectedUser);
      },
      (error) => {
        console.log("Error al cargar el usuario:", error);
      }
    );
  }
  
  public validateInputs(): boolean {
    this.errorMessages.fechaInicio = this.fechaInicio ? '' : 'Debe ingresar una fecha de inicio';
    // this.errorMessages.fechaTermino = this.fechaTermino ? '' : 'Debe ingresar una fecha de término';
    this.errorMessages.aceptaTerminos = this.aceptaTerminos ? '' : 'Debe aceptar los términos y condiciones';
    this.errorMessages.cantidadMeses = this.cantidadMeses > 0 ? '' : 'Debe ingresar una cantidad de meses';
  
    return (
      this.errorMessages.fechaInicio === '' &&
      // this.errorMessages.fechaTermino === '' &&
      this.errorMessages.aceptaTerminos === '' &&
      this.errorMessages.cantidadMeses === ''
    );
  }


  validateFechaInicio(fechaInicio: Date): boolean {

    const fechaInicioDate = new Date(fechaInicio);
    // const fechaTerminoDate = new Date(fechaTermino);
    const fechaActual = new Date();

    // Validar que la fecha de inicio sea mayor o igual a la fecha actual
    if (fechaInicioDate <= fechaActual) {
      this.errorMessages.fechaInicio = 'La fecha de inicio debe ser igual o posterior a la fecha actual';
      return false;
    }

    //VALIDAR QUE NO HAYA RESERVAS EN ESTA FECHA

    // // Validar que la fecha de inicio sea menor a la fecha de término
    // if (fechaInicioDate > fechaTerminoDate) {
    //   this.errorMessages.fechaInicio = 'La fecha de inicio debe ser anterior a la fecha de término';
    //   return false;
    // }
  
    // Validar que la fecha de término sea mayor a la fecha actual
    // if (fechaTerminoDate < fechaActual) {
    //   this.errorMessages.fechaTermino = 'La fecha de término debe ser posterior a la fecha actual';
    //   return false;
    // }
  
    // Si todas las validaciones pasan, no hay errores
    this.errorMessages.fechaInicio = '';
    // this.errorMessages.fechaTermino = '';
    return true;
  }

  validateCantidadMeses(cantidadMeses: number): boolean {
    // Validar que la cantidad de meses sea mayor a 0
    if (cantidadMeses <= 0) {
      this.errorMessages.cantidadMeses = 'La cantidad de meses debe ser mayor a 0';
      return false;
    }
  
    // Si todas las validaciones pasan, no hay errores
    this.errorMessages.cantidadMeses = '';
    return true;
  }

  // calculateDays(fechaInicio: Date, cantidadMeses : Number): Number {
  
  //   // TOMAR LA CANTIDAD DE MESES Y MULTIPLICAR POR 30

  //   const fechaInicioDate = new Date(fechaInicio);
  //   // const fechaTerminoDate = new Date(fechaTermino);
  //   // Calcula la diferencia en milisegundos entre las dos fechas
  //   const diferenciaMs = fechaTerminoDate.getTime() - fechaInicioDate.getTime();
  
  //   // Calcula la diferencia en días dividiendo la diferencia en milisegundos por el número de milisegundos en un día
  //   const diferenciaDias = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
  //   console.log(diferenciaDias);
  //   return diferenciaDias;
  // }

  calculatePrice(cantidadMeses: number, price: number): number {
    const totalPrice = cantidadMeses * price;
    return totalPrice;
  }

  // ------------------ Generación de contrato ------------------
  // Este método genera un contrato genérico y devuelve su contenido como una cadena de texto
  generateGenericContract(
      user: User, 
      room: Room, 
      fechaInicio : Date, 
      fechaTermino : Date,
      precio : number,
      cantidadMeses : number,
    ): string {
    // Obtener información del usuario y de la habitación si es necesario
    const userName = user ? user.nombre + user.apellido : 'Nombre del Usuario';
    const roomInfo = room ? `Habitación: ${room.calle} ${room.numero}, ${room.comuna}, ${room.region}` : 'Información de la Habitación';
    
    // Crear el contenido del contrato con la información obtenida
    const contractContent = `

      Comparece ante el presente contrato, por una parte, ${userName}, cédula nacional de identidad ${user.rut}, nacido el ${user.fecha_nacimiento}, con telefono ${user.telefono}, chileno(a), como subarrendatario(a), y por la otra parte, RooMatch.SA, RUT 76.371.666-1, como subarrendatario principal, se ha convenido el siguiente contrato de subarriendo de casa o departamento:

      1.- PROPIEDAD SUBARRENDADA Y PARTES: ${userName} es arrendatario de la habitación número 2 ubicada en ${roomInfo},Chile y lo da en subarriendo RooMatch.SA, quien lo recibe en arriendo para destinarlo a vivienda.
      
      2.- PLAZO DE ARRENDAMIENTO: El período del subarriendo es desde el ${fechaInicio} hasta ${fechaTermino}, esto es por un periodo de ${cantidadMeses}.
      
      3.- RENTA: El precio del arriendo es de $${precio} por ${cantidadMeses} meses, e incluye los gastos comunes. Esto es, interet, agua, gas y gasto comunes de la propiedad.
      
      4.- PLAZO DE PAGO: La totalidad del monto debe ser pagado antes de la fecha de inicio del arriendo. En caso de arrendar por un periodo mayor a 30 días, el pago se realizará en cuotas mensuales de $${room.precio} por día, pagaderas los primeros 5 días habiles del mes.
      
      5.- MODALIDAD DE PAGO: El pago se realizará mediante la plataforma de Roomatch SA. (www.roomatch.cl) en la sección de pagos.
      
      6.- RESPONSABILIDAD POR DAÑOS: El subarrendatario se hace responsable de los daños que se produzcan en la propiedad durante el periodo de arriendo.
      
      7.- TERMINO DEL CONTRATO: El contrato termina al finalizar el periodo de arriendo, sin necesidad de aviso previo.
      
      8.- TERMINO ANTICIPADO: El contrato puede terminar anticipadamente en los siguientes casos:
          a) Por mutuo acuerdo entre las partes.
          b) Por incumplimiento de las obligaciones del contrato por parte del subarrendatario.
          c) Por necesidad de la propiedad.
          d) Por necesidad del arrendador.
          e) Por necesidad del arrendatario.


          Firma del Arrendador: __________________ Firma del Arrendatario: __________________
    `;
    return contractContent;
}

generatePdfContract(contractContent: string) {
  const documentDefinition = {
    content: [
      { 
        text: 'CONTRATO DE ARRIENDO DE CASA O DEPARTAMENTO', 
        style: 'header',
        alignment: 'center',
        margin: [0, 0, 0, 20], // [left, top, right, bottom]
      },
      
      { 
        text: contractContent,
        style: 'contractText',
        alignment: 'justify',
        margin: [10, 0], // Márgenes izquierdo y derecho
      },
      
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
      contractText: {
        fontSize: 12,
        lineHeight: 1.5, // Espacio entre líneas
      },
    },
  };

  const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
  // Genera el PDF y lo abre en una nueva ventana o pestaña del navegador
  pdfDocGenerator.open();
}

calculateFechaTermino(fechaInicio: Date, cantidadMeses: number): Date {
  const fechaInicioDate = new Date(fechaInicio);
  const fechaTerminoDate = new Date(fechaInicio);
  fechaTerminoDate.setMonth(fechaInicioDate.getMonth() + cantidadMeses);
  return fechaTerminoDate;
}
 
submitForm(){
  //además debo validar las fechas que ya tienen reserva
  if(this.validateInputs() && this.validateFechaInicio(this.fechaInicio) && this.validateCantidadMeses(this.cantidadMeses)){
    // const dayCount = this.calculateDays(this.fechaInicio, this.cantidadMeses);
    const numberPrice = parseFloat(this.roomService.selectedRoom.precio.toString());
    const totalPrice = this.calculatePrice(this.cantidadMeses, numberPrice);
    this.fechaTermino = this.calculateFechaTermino(this.fechaInicio, this.cantidadMeses);
    
    const contractContent = this.generateGenericContract(
      this.userService.selectedUser, 
      this.roomService.selectedRoom, 
      this.fechaInicio, 
      this.fechaTermino,
      totalPrice,
      this.cantidadMeses,
    );

    const bookingData = {
      _id: '',
      userId : this.userService.selectedUser._id,
      roomId : this.roomService.selectedRoom._id,
      fecha_inicio : this.fechaInicio,
      fecha_fin : this.fechaTermino,
      fecha_creacion: new Date(),
      estado : environment.estado.pendiente,
      precio : totalPrice,
      pdf:contractContent,
      ref_pdf_user: '',
      url_pdf_user: '',
      precio_servicio : 0,
      precio_total : 0,
      periodoMeses : this.cantidadMeses,
    }
  
    this.bookingService.postBooking(bookingData as Booking).subscribe(
      (res) => {
        console.log(res);
        // Genera un enlace al contrato genérico y ábrelo en una nueva ventana o pestaña del navegador
        this.generatePdfContract(contractContent);
        
      },
      (error) => {
        console.log(error);
      }
    );
    //extraer información del usuario
    console.log(this.userService.selectedUser);
    //extrer información de la habitación
    console.log(this.roomService.selectedRoom);
  }
  }
}
