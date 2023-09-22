import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room-views-add',
  templateUrl: './room-views-add.component.html',
  styleUrls: ['./room-views-add.component.css']
})
export class RoomViewsAddComponent implements OnInit {

  isUploadModel: boolean = false;

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    // subir a la base de datos la habitación creada
    // al subir debo updatear la lista roomService.rooms
    
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.handleFiles(files);
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      const files = inputElement.files;
      this.handleFiles(files);
    }
  }

  private handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Validar el tipo y tamaño del archivo aquí antes de cargarlo
      // Procesar el archivo (por ejemplo, mostrar una previsualización)
      this.isUploadModel = true;
    }
  }


}
