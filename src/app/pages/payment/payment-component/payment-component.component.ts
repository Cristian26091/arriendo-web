import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-payment-component',
  templateUrl: './payment-component.component.html',
  styleUrls: ['./payment-component.component.css']
})
export class PaymentComponentComponent implements OnInit {

  currentStep = 1;
  currentContent: string = '';

  //estado inicial del stepper
  hideNextButton: boolean = false;
  hidePreviousButton: boolean = true;

  // Dentro de tu componente
  steps = [
    { title: 'Servicios', content: 'services'},
    { title: 'Tus datos', content: 'details' },
    { title: 'Resumen de compra', content: 'resumen' },
    { title: 'Pago', content: 'payment' },
    
  ];

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    this.currentContent = this.steps[0].content;
  }

  ngOnDestroy(): void {
    this.cookieService.delete('booking_id');
  }





  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.currentContent = this.steps[this.currentStep - 1].content;
    }
    this.updateButtonVisibility();
  }

  nextStep() {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
      this.currentContent = this.steps[this.currentStep - 1].content;
    }
    this.updateButtonVisibility();
  }

  updateButtonVisibility() {
    this.hideNextButton = this.currentStep === 4;
    this.hidePreviousButton = this.currentStep === 1;
  }

}
