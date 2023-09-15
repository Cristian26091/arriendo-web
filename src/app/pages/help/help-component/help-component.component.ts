import { Component, OnInit } from '@angular/core';
import { HeelpService } from '../../..//services/heelp.service';
import { Help } from '../../../models/heelp';

@Component({
  selector: 'app-help-component',
  templateUrl: './help-component.component.html',
  styleUrls: ['./help-component.component.css']
})
export class HelpComponentComponent implements OnInit {

  constructor(private heelpService : HeelpService) { }

  ngOnInit(): void {
    this.getHelps();
  }

  getHelps(){
    this.heelpService.getHelps().subscribe(
      (response) => {
        this.heelpService.helps = response as Help[];
      },
      (error) => {
        console.log(error);
      }
    );
  }




}
