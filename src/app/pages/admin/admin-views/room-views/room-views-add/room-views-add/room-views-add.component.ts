import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { RegionService } from 'src/app/services/region.service';
import { Region } from 'src/app/models/region.model';
import { Room } from 'src/app/models/room';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-room-views-add',
  templateUrl: './room-views-add.component.html',
  styleUrls: ['./room-views-add.component.css']
})
export class RoomViewsAddComponent implements OnInit {
  //opciones
  homeTypes = ['casa','depto'];
  bathRoomTypes = ['privado','compartido'];

  //Variables para el mapa
  map: mapboxgl.Map;
  private marker: mapboxgl.Marker;

  //Campos para ubicación
  selectedRegion: string = '';
  selectedComuna: string = '';
  roomStreet: string = '';
  selectedLatitude: number = 0;
  selectedLongitude: number = 0;
  //Campos de la habitación
  selectedHome: string = '';
  isShareBathroom = false;
  roomNumber: string = '';
  roomPrice: string = '';
  roomDescription: string = '';
  //Campos del modelo 3D
  isUploadModel: boolean = false;
  url_model :string = '';
  model_ref: string = ''; //referencia del nombre del modelo en el bucket
  uploadedImageUrls: string[] = []; //referencia de las imagenes en el bucket
  uploadedImageNames: string[] = []; //referencia de los nombres de las imagenes en el bucket
  texture_ref: string = ''; //referencia de la textura en el bucket
  texture_url: string = ''; //url de la textura en el bucket
  //mensajes de error
  errorMessage: string = '';
  roomErrorMessage: string = '';
  priceErrorMessage: string = '';
  ModelErrorMessage: string = '';
  textureErroMessage: string = '';


  constructor(private roomService:RoomService, public regionService:RegionService) { }

  ngOnInit(): void {
    this.getRegions();
    // window.addEventListener('beforeunload', (event) => {
    //   event.returnValue = '¿Seguro que quieres abandonar la página?';
    // });
  }

  ngAfterViewInit(): void {
    this.initializeMapp();
  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.onBeforeUnloadModel.bind(this));
    this.onBeforeUnloadModel();
    this.onBeforeUnloadImages();
    this.onBeforeUnloadTexture();
  }

  //-----------------------MAPA----------------------
  initializeMapp() {
    mapboxgl.accessToken = environment.mapBoxToken;

    // Coordenadas del punto de referencia
    const referenceCoordinates = [-70.92598734861738, -34.24970887667549];

    this.map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: referenceCoordinates,
      zoom: 14,
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    
    // Manejar el evento de clic en el mapa
    this.map.on('click', (e) => {
      const coordinates = e.lngLat;
      console.log('Coordenadas seleccionadas:', coordinates);
      // Actualiza las coordenadas en tus variables del componente
      this.selectedLatitude = coordinates.lat;
      this.selectedLongitude = coordinates.lng;
      // Elimina el marcador existente si existe
      if (this.marker) {
        this.marker.remove();
      }
      // Crea un nuevo marcador en las coordenadas seleccionadas
      this.marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(this.map);
      console.log('Posición del marcador:', this.marker.getLngLat());
    });
  }

  // ---------------------- MODELADO 3D ----------------------
  onDragOver(event: DragEvent) {  
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.handle3DFiles(files);
  }

  private handle3DFiles(files: FileList) {

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validar el tipo de archivo [obj]
      if (!this.isValidFileType(file)) {
        this.ModelErrorMessage = 'Tipo de archivo no válido. Por favor, sube archivos OBJ o el rar de tu proyecto .';
        continue; // Saltar este archivo y continuar con el siguiente
      }

      // Validar el tamaño del archivo (por ejemplo, limitar a un tamaño máximo en bytes)
      if (!this.isValidFileSize(file)) {
        this.ModelErrorMessage = 'Tamaño de archivo no válido. El tamaño máximo permitido es 300 MB.';
        continue; // Saltar este archivo y continuar con el siguiente
      }

      //Cargar el archivo si es obj o rar jpg o png
      this.roomService.uploadModelFile(file).subscribe(
        (res) => {
          // Maneja la respuesta del servidor (por ejemplo, actualiza la URL del modelo en tu formulario)
          console.log('Archivo cargado con éxito:', res.message);
          this.url_model = res.downloadLink;
          this.model_ref = res.fileName;
        },
        (error) => {
          console.error('Error al cargar el archivo:', error);
        }
      );
      // Establece la bandera de carga del modelo
      this.isUploadModel = true;
    }
  }

  // Método que se ejecutará antes de cerrar/cambiar la página
  onBeforeUnloadModel() {
    if (this.model_ref) {
      // Elimina el modelo del bucket usando el nombre del archivo
      this.roomService.deleteModelFile(this.model_ref).subscribe(
        (res) => {
          console.log('Modelo eliminado del bucket con éxito:', res.message);
          // Limpia la referencia del modelo en la variable
          this.model_ref = '';
        },
        (error) => {
          console.error('Error al eliminar el modelo del bucket:', error);
        }
      );
    }
  }

  // ----------------------- TEXTURA -----------------------
 

  onDropTexture(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.handleTextureFiles(files);
  }

  handleTextureFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validar el tipo de archivo [jpg o png]
      if (!this.isValidTextureType(file)) {
        this.textureErroMessage = 'Tipo de archivo no válido. Por favor, sube archivos JPG o PNG.';
        continue; // Saltar este archivo y continuar con el siguiente
      }

      //Cargar el archivo si es jpg o png
      this.roomService.uploadTextureFile(file).subscribe(
        (res) => {
          // Maneja la respuesta del servidor (por ejemplo, actualiza la URL del modelo en tu formulario)
          console.log('Archivo cargado con éxito:', res);
          this.texture_ref = res.fileName;
          this.texture_url = res.downloadLink;
        },
        (error) => {
          console.error('Error al cargar el archivo:', error);
        }
      );
      // Establece la bandera de carga del modelo
      this.isUploadModel = true;
    }
  }

  onBeforeUnloadTexture() {
    if (this.texture_ref) {
      // Elimina el modelo del bucket usando el nombre del archivo
      this.roomService.deleteTextureFile(this.texture_ref).subscribe(
        (res) => {
          console.log('Textura eliminada del bucket con éxito:', res.message);
          // Limpia la referencia del modelo en la variable
          this.texture_ref = '';
        },
        (error) => {
          console.error('Error al eliminar la textura del bucket:', error);
        }
      );
    }
  }

  // ---------------------- IAMGENES----------------------

  // Función para manejar el evento 'drop' de las imagenes del cover
  onDropImages(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    this.handleImagesFile(files); // Solo se espera un archivo de imagen
  }

  private handleImagesFile(files: FileList) {
    const fileArray: File[] = [];

    for (let i = 0; i < files.length; i++) {
      fileArray.push(files[i]);
    }

    // Validar el tipo y tamaño de los archivos de imagen aquí antes de cargarlos
    
    this.roomService.uploadImagesFiles(fileArray).subscribe(
      (res) => {
        console.log('Archivo cargado con éxito:', res);
        // this.url_image_cover = res.downloadLink;
        // this.image_ref = res.fileName;
        // console.log(this.url_image_cover, this.image_ref);
        const resImages = res.images;
        resImages.forEach((image: any) => {
          this.uploadedImageUrls.push(image.downloadLink);
          this.uploadedImageNames.push(image.fileName);
        }); 
        // console.log("resimages",resImages);
      },
      (error) => {
        console.error('Error al cargar el archivo:', error);
      }
    );
    
  }

  onBeforeUnloadImages() {
    console.log(this.uploadedImageNames);
    console.log(this.uploadedImageUrls);
  }

  // ---------------------- FORMULARIO ----------------------

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

  //------------------- VALIDACIONES -------------------  

  validateRoomNumber() {
    const roomNumberValue = this.roomNumber;
  
    // Expresión regular para validar que el valor sea solo un número entero positivo.
    const numberPattern = /^[0-9]+$/;
  
    if (!numberPattern.test(roomNumberValue) || parseInt(roomNumberValue) <= 0) {
      // El número de habitación no es válido o es menor o igual a cero.
      // Puedes establecer una variable de error o mostrar un mensaje de error.
      this.roomErrorMessage = 'Por favor, ingrese un número de habitación válido.';
    } else {
      // El número de habitación es válido, puedes borrar el mensaje de error.
      this.roomErrorMessage = '';
    }
  }

  validateRoomPrice() {
    const roomPriceValue = this.roomPrice;
    
    // Expresión regular para validar que el valor sea un número entero positivo.
    const numberPattern = /^[1-9]\d*$/;
  
    if (!numberPattern.test(roomPriceValue)) {
      // El precio no es un número entero válido.
      // Puedes establecer una variable de error o mostrar un mensaje de error.
      this.priceErrorMessage = 'Por favor, ingrese un precio mensual válido en CLP.';
    } else {
      // El precio es un número entero válido, puedes borrar el mensaje de error.
      this.priceErrorMessage = '';
    }
  }

  private isValidFileType(file: File): boolean {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    // Verificar si la extensión es "obj" o "rar", jpg o png para texturas
    const allowedFileExtensions = ['obj', 'rar', 'jpg', 'png'];
    return allowedFileExtensions.includes(fileExtension);
  }

  private isValidFileSize(file: File): boolean {
    // Verificar si el tamaño del archivo es aceptable
    const maxSizeBytes = 300 * 1024 * 1024; // 300 MB
    return file.size <= maxSizeBytes;
  }

  private isValidTextureType(file: File): boolean {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    // Verificar si la extensión es "jpg" o "png"
    const allowedFileExtensions = ['jpg', 'png'];
    return allowedFileExtensions.includes(fileExtension);
  }
  
  onSubmit(){
    if (this.selectedRegion || this.selectedComuna || this.selectedHome || this.roomNumber || 
      this.roomStreet || this.roomPrice) {
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
      room.fecha_publicacion = new Date(); //fecha actual

      //campos modelo 3D
      // room.url_image_cover=this.url_image_cover;
      // room.image_ref_bucket = this.image_ref;
      room.url_model= this.url_model;
      room.model_ref_bucket = this.model_ref;

      console.log(room);
    }
    // Muestra un mensaje de error o alerta al usuario indicando que los campos requeridos están vacíos.
    this.errorMessage = 'Por favor, completa todos los campos obligatorios.';
    return;

    


  }
}
