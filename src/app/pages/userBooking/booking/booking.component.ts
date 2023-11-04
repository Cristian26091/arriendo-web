import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { CookieService } from 'ngx-cookie-service';
import { Booking } from 'src/app/models/booking';
import { RoomService } from 'src/app/services/room.service';
import { environment } from 'src/environments/environment';
import {Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  constructor(public bookingService: BookingService, private cookieService: CookieService, private roomService: RoomService, private router: Router, private messageService: MessageService) {}

  async ngOnInit(): Promise<void> {

      const userID = this.cookieService.get('user_id');

      try {
        const res = await this.bookingService.getBookingByUser(userID).toPromise();
        this.bookingService.bookings = res as Booking[];

        if (this.bookingService.bookings) {
          for (const booking of this.bookingService.bookings) {
              const roomId = booking.roomId;
              const room = await this.roomService.getRoom(roomId).toPromise();
              this.roomService.rooms.push(room);
          }
      } else {
          this.bookingService.bookings = [];
          console.log("No hay reservas");
      }

      } catch (error) {
        console.error(error);
      }
  }

  showCancelToast() {
    this.messageService.add({ key: 'cancelToast', severity: 'success', summary: 'Reserva Cancelada', detail: 'La reserva ha sido cancelada con éxito' });
  }

  getRoomName(roomId: string): string {
    // Busca la información de la habitación por su roomId
    const room = this.roomService.rooms.find((room) => room._id === roomId);
    const name = room ? room.calle + ' ' + room.numero+ ',' + room.comuna +',' + room.region: 'Habitación no encontrada';
    return name;
  }

  cancelBooking(bookingId: string): void {
    // Mostrar una alerta de confirmación
    const confirmed = window.confirm('¿Estás seguro de que deseas cancelar esta reserva?');
    if (confirmed) {
      this.bookingService.deleteBooking(bookingId).subscribe(
        (res) => {
          // Elimina la reserva cancelada de la lista local de reservas
          this.bookingService.bookings = this.bookingService.bookings.filter(
            (booking) => booking._id !== bookingId
          );
          this.showCancelToast(); // Mostrar el toast de éxito
        },
        (error) => {
          console.error('Error al cancelar la reserva:', error);
          // Muestra un toast de error si la cancelación falla
        }
      );
    }
    return;
  }

  isConfirmed(booking: Booking): boolean {
    return booking.estado === environment.estado.confirmada;
  }

  goToPayment(){
    this.router.navigate(['/payment']);
  }

  capturarPDF(event: any, booking: Booking){
    const selectedFile = event.target.files[0]; // Obtiene el primer archivo seleccionado

    if (selectedFile) {
      // console.log('Archivo seleccionado:', selectedFile.name);
      this.uploadPDFUser(selectedFile, booking);
    
    } else {
      console.log('Ningún archivo seleccionado');
    }
  }

  async uploadPDFUser(file: File, booking: Booking){
    try {
      const  res = await this.bookingService.uploadPDFUser(file).toPromise();
      console.log(res.message);
      booking.url_pdf_user = res.downloadLink;
      booking.ref_pdf_user = res.fileName;

      console.log(booking.url_pdf_user, booking.ref_pdf_user);
      const resPutBooking = await this.putBooking(booking);
    } catch (error) {
      console.log(error);
    }
  }

  async putBooking(booking: Booking){
    try {
      const res = await this.bookingService.putBooking(booking).toPromise();
      console.log(res);
    } catch (error) {
      console.log(error); 
    }
  }

  generateContract(booking: Booking): void {

    const documentDefinition = {
      content: [
        { 
          text: 'CONTRATO DE ARRIENDO DE CASA O DEPARTAMENTO', 
          style: 'header',
          alignment: 'center',
          margin: [0, 0, 0, 20], // [left, top, right, bottom]
        },
        
        { 
          text: booking.pdf,
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
  
    // Genera el PDF
    const pdfDoc = pdfMake.createPdf(documentDefinition);
  
    // Muestra el PDF en una ventana nueva
    pdfDoc.open();
  }

  
   

}
