import { Component } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})


export class StepperComponent {

  constructor() { }

  downloadMyFile(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiLiKqE2rf7AhWtL7kGHZoJBrkQFnoECCUQAQ&url=https%3A%2F%2Fwww.pisocompartido.cl%2Fcontrato.doc&usg=AOvVaw00qoWIguCzaTAHJm8QCeSV');
    link.setAttribute('download', `contrato.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
}
  

}


