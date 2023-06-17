import { Component, OnInit } from '@angular/core';

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
    { title: 'Tus datos', content: 'data' },
    { title: 'Detalles', content: 'details' },
    { title: 'Pago', content: 'payment' }
  ];



  constructor() { }

  ngOnInit(): void {
    this.currentContent = this.steps[0].content;
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
    this.hideNextButton = this.currentStep === 3;
    this.hidePreviousButton = this.currentStep === 1;
  }

}
