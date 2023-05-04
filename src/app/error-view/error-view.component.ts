import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-view',
  templateUrl: './error-view.component.html',
  styleUrls: ['./error-view.component.css']
})
export class ErrorViewComponent implements OnInit {

  @Input() title: string = '';
  @Input() message: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
