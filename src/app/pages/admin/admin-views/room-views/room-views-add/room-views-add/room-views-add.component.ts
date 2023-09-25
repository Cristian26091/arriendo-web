import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { RegionService } from 'src/app/services/region.service';
import { Region } from 'src/app/models/region.model';
import { Room } from 'src/app/models/room';

@Component({
  selector: 'app-room-views-add',
  templateUrl: './room-views-add.component.html',
  styleUrls: ['./room-views-add.component.css']
})
export class RoomViewsAddComponent implements OnInit {
  //opciones
  homeTypes = ['casa','depto'];
  bathRoomTypes = ['privado','compartido'];
  //Campos para ubicación
  selectedRegion: string = '';
  selectedComuna: string = '';
  roomStreet: string = '';
  //Campos de la habitación
  selectedHome: string = '';
  isShareBathroom = false;
  roomNumber: string = '';
  roomPrice: string = '';
  roomDescription: string = '';
  //Campos del modelo 3D
  isUploadModel: boolean = false;
  //mensaje de error
  errorMessage: string = '';


  constructor(private roomService:RoomService, public regionService:RegionService) { }

  ngOnInit(): void {
    this.getRegions();
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

  private async getRegions(){
    this.regionService.getRegions().subscribe(
    (res) => {
      this.regionService.regions = res as Region[];
    },
    (error) => {
      console.error('Error al obtener las regiones:', error);
    }
  );
  }

  onRegionSelect(event : Event){
    console.log(this.selectedRegion);
    const region = this.regionService.regions.find(r => r.nombre_region === this.selectedRegion);
    if (region) {
      this.regionService.selectedRegion = region;
    }
  }

  onComunaSelect(event : Event){
    console.log(this.selectedComuna);
  }

  onSelectHome(event : Event){
    console.log(this.selectedHome)
  }

  onBathroomTypeSelect(event: Event) {
    const selectedType = (event.target as HTMLSelectElement).value;
  
    // Actualiza isShareBathroom en función de la selección
    this.isShareBathroom = selectedType === 'compartido';

    console.log(this.isShareBathroom);
  }

  onSubmit(){
    const room = new Room();
    //asignar valores a la habitación
    room.region = this.selectedRegion;
    room.comuna = this.selectedComuna;
    room.casa_depto = this.selectedHome;
    room.banio_compartido = this.isShareBathroom;
    room.numero = this.roomNumber;
    room.calle = this.roomStreet;
    room.precio = this.roomPrice;
    room.descripcion = this.roomDescription;
    
    //campos genericos
    room.esta_arrendado = "false";
    room.reservas = [];

    //campos modelo 3D
    room.url_image_cover='';
    room.url_model= '';
    room.url_image_cover= '';

    console.log(room);


  }





}
