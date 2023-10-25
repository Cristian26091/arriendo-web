import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { RegionService } from 'src/app/services/region.service';
import { Region } from 'src/app/models/region.model';
import { Room } from 'src/app/models/room';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { ImageRef } from 'src/app/models/image-ref';



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
  url_modelHQ :string = '';
  model_refHQ: string = ''; //referencia del nombre del modelo en el bucket
  url_modelLQ :string = '';
  model_refLQ: string = ''; //referencia del nombre del modelo en el bucket
  //Campos de las imagenes
  imagesRefs : ImageRef[] = [];
  texture_refHQ: string = ''; //referencia de la textura en el bucket
  texture_urlHQ: string = ''; //url de la textura en el bucket
  texture_refLQ: string = ''; //referencia de la textura en el bucket
  texture_urlLQ: string = ''; //url de la textura en el bucket
  cover_image_url: String = ''; //url de la imagen de portada en el bucket
  //mensajes de error
  ModelErrorMessageHQ: string = '';
  textureErroMessageHQ: string = '';
  ModelErrorMessageLQ: string = '';
  textureErroMessageLQ: string = '';
  regionErrorMessage: string = '';
  comunaErrorMessage: string = '';
  locationErrorMessage: string = '';
  homeErrorMessage: string = '';
  roomErrorMessage: string = '';
  bathroomErrorMessage: string = '';  
  priceErrorMessage: string = '';
  streetErrorMessage: string = '';
  descriptionErrorMessage: string = '';
  imagesErrorMessage: string = '';
  errorMessage: string = '';
  


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

  //----------------------- DRAG -----------------------
  onDragOver(event: DragEvent) {  
    event.preventDefault();
    event.stopPropagation();
  }

  // ---------------------- MODELADO 3D ----------------------

  onDropModelHQ(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if(files.length > 1){
      this.ModelErrorMessageHQ = 'Solo se puede cargar un archivo a la vez.';
      return;
    }
    else{
      const file = files[0];
      this.handle3DFileHQ(file);
    }
  }

  onDropModelLQ(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if(files.length > 1){
      this.ModelErrorMessageLQ = 'Solo se puede cargar un archivo a la vez.';
      return;
    }
    else{
      const file = files[0];
      this.handle3DFileLQ(file);
    }
  }
  

  //Manejo de un solo modelo 3D
  private handle3DFileHQ(file: File) {
      
    // Validar el tipo de archivo obj
    if (!this.isValidModelType(file)) {
      this.ModelErrorMessageHQ = 'Tipo de archivo no válido. Por favor, sube archivos con extensión obj, glb o gltf.';
      return; // Saltar este archivo y continuar con el siguiente
    }

    // Validar el tamaño del archivo (por ejemplo, limitar a un tamaño máximo en bytes)
    if (!this.isValidModelFileSize(file)) {
      this.ModelErrorMessageHQ = 'Tamaño de archivo no válido. El tamaño máximo permitido es 300 MB.';
      return; // Saltar este archivo y continuar con el siguiente
    }

    this.roomService.uploadModelFile(file).subscribe(
      (res) => {
        // Maneja la respuesta del servidor (por ejemplo, actualiza la URL del modelo en tu formulario)
        console.log('Archivo cargado con éxito:', res);
        this.url_modelHQ = res.downloadLink;
        this.model_refHQ = res.fileName;
      },
      (error) => {
        console.error('Error al cargar el archivo:', error);
      }
    );
  
  }

  //Manejo de un solo modelo 3D
  private handle3DFileLQ(file: File) {
      
    // Validar el tipo de archivo obj
    if (!this.isValidModelType(file)) {
      this.ModelErrorMessageLQ = 'Tipo de archivo no válido. Por favor, sube archivos .obj.';
      return; // Saltar este archivo y continuar con el siguiente
    }

    // Validar el tamaño del archivo (por ejemplo, limitar a un tamaño máximo en bytes)
    if (!this.isValidModelFileSize(file)) {
      this.ModelErrorMessageLQ = 'Tamaño de archivo no válido. El tamaño máximo permitido es 300 MB.';
      return; // Saltar este archivo y continuar con el siguiente
    }

    this.roomService.uploadModelFile(file).subscribe(
      (res) => {
        // Maneja la respuesta del servidor (por ejemplo, actualiza la URL del modelo en tu formulario)
        console.log('Archivo cargado con éxito:', res);
        this.url_modelLQ = res.downloadLink;
        this.model_refLQ = res.fileName;
      },
      (error) => {
        console.error('Error al cargar el archivo:', error);
      }
    );
  }

  // Método que se ejecutará antes de cerrar/cambiar la página
  onBeforeUnloadModel() {
    if (this.model_refHQ) {
      // Elimina el modelo del bucket usando el nombre del archivo
      this.roomService.deleteModelFile(this.model_refHQ).subscribe(
        (res) => {
          console.log('Modelo eliminado del bucket con éxito:', res.message);
          // Limpia la referencia del modelo en la variable
          this.model_refHQ = '';
        },
        (error) => {
          console.error('Error al eliminar el modelo del bucket:', error);
        }
      );
    }
    if(this.model_refLQ){
      //elimina el modelo del bucket usando el nombre del archivo
      this.roomService.deleteModelFile(this.model_refLQ).subscribe(
        (res) => {
          console.log('Modelo eliminado del bucket con éxito:', res.message);
          // Limpia la referencia del modelo en la variable
          this.model_refLQ = '';
        },
        (error) => {
          console.error('Error al eliminar el modelo del bucket:', error);
        }
      );
    }
  }

  // ----------------------- TEXTURA -----------------------
 
  onDropTextureHQ(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if(files.length > 1){
      this.textureErroMessageHQ = 'Solo se puede cargar un archivo a la vez.';
      return;
    }
    else{
      const file = files[0];
      this.handleTextureFileHQ(file);

    }
  }

  onDropTextureLQ(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if(files.length > 1){
      this.textureErroMessageLQ = 'Solo se puede cargar un archivo a la vez.';
      return;
    }
    else{
      const file = files[0];
      this.handleTextureFileLQ(file);
    }
  }

  handleTextureFileHQ(file: File) {

    // Validar el tipo de archivo [jpg o png]
    if (!this.isValidTextureType(file)) {
      this.textureErroMessageHQ = 'Tipo de archivo no válido. Por favor, sube archivos JPG o PNG.';
      return; // Saltar este archivo y continuar con el siguiente
    }

    if(!this.isValidTextureFileSize(file)){
      this.textureErroMessageHQ = 'Tamaño de archivo no válido. El tamaño máximo permitido es 25 MB.';
      return;
    }

    this.processTextureImage(file);

    //Cargar el archivo si es jpg o png
    this.roomService.uploadTextureFile(file).subscribe(
      (res) => {
        // Maneja la respuesta del servidor (por ejemplo, actualiza la URL del modelo en tu formulario)
        console.log('Archivo cargado con éxito:', res);
        this.texture_refHQ = res.fileName;
        this.texture_urlHQ = res.downloadLink;
      },
      (error) => {
        console.error('Error al cargar el archivo:', error);
      }
    );

  }

  handleTextureFileLQ(file: File) {

    // Validar el tipo de archivo [jpg o png]
    if (!this.isValidTextureType(file)) {
      this.textureErroMessageLQ = 'Tipo de archivo no válido. Por favor, sube archivos JPG o PNG.';
      return; // Saltar este archivo y continuar con el siguiente
    }

    if(!this.isValidTextureFileSize(file)){
      this.textureErroMessageLQ = 'Tamaño de archivo no válido. El tamaño máximo permitido es 25 MB.';
      return;
    }

    this.processTextureImage(file);

    //Cargar el archivo si es jpg o png
    this.roomService.uploadTextureFile(file).subscribe(
      (res) => {
        // Maneja la respuesta del servidor (por ejemplo, actualiza la URL del modelo en tu formulario)
        console.log('Archivo cargado con éxito:', res);
        this.texture_refLQ = res.fileName;
        this.texture_urlLQ = res.downloadLink;
      },
      (error) => {
        console.error('Error al cargar el archivo:', error);
      }
    );
  }

  onBeforeUnloadTexture() {
    if (this.texture_refHQ) {
      // Elimina la textura del bucket usando el nombre del archivo
      this.roomService.deleteTextureFile(this.texture_refHQ).subscribe(
        (res) => {
          console.log('Textura eliminada del bucket con éxito:', res.message);
          this.texture_refHQ = '';
        },
        (error) => {
          console.error('Error al eliminar la textura del bucket:', error);
        }
      );
    }

    if(this.texture_refLQ){
      //elimina la textura del bucket usando el nombre del archivo
      this.roomService.deleteTextureFile(this.texture_refLQ).subscribe(
        (res) => {
          console.log('Textura eliminada del bucket con éxito:', res.message);
          this.texture_refLQ = '';
        },
        (error) => {
          console.error('Error al eliminar la textura del bucket:', error);
        }
      );
    }
  }

  processTextureImage(file: File): File{
    console.log("File", file);
    return null;
  }

  // ---------------------- IAMGENES----------------------

  // Función para manejar el evento 'drop' de las imagenes del cover
  onDropImages(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    this.handleImagesFile(files); // Solo se espera un archivo de imagen
  }

  // Función para manejar el evento 'change' de las imagenes del cover
  private handleImagesFile(files: FileList) {
    const fileArray: File[] = [];

    for (let i = 0; i < files.length; i++) {
      fileArray.push(files[i]);
    }

    // Validar el tipo y tamaño de los archivos de imagen aquí antes de cargarlos
    
    this.roomService.uploadImagesFiles(fileArray).subscribe(
      (res) => {
        console.log('Archivo cargado con éxito:', res);
        const resImages = res.images;
        resImages.forEach((image: any) => {
          this.imagesRefs.push(new ImageRef(image.fileName, image.downloadLink));
        }); 
      },
      (error) => {
        console.error('Error al cargar el archivo:', error);
      }
    );
  }

  // Método que se ejecutará antes de cerrar/cambiar la página
  onBeforeUnloadImages() {
    if(this.imagesRefs.length > 0){
      // Elimina la imagen del bucket usando el nombre del archivo
      this.roomService.deleteImagesFiles(this.imagesRefs).subscribe(
        (res) => {
          console.log('Imagen eliminada del bucket con éxito:', res.message);
        },
        (error) => {
          console.error('Error al eliminar la imagen del bucket:', error);
        }
      );
    }
  }

  //función para elegir la imagen de portada aleatoriamente
  chooseCoverImage(){
    const randomIndex = Math.floor(Math.random() * this.imagesRefs.length);
    this.cover_image_url =  this.imagesRefs[randomIndex].url;
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

  getFileName(ruta: string): string {
    const partesRuta = ruta.split('/');
    const nombreArchivoConExtension = partesRuta[partesRuta.length - 1];
    const partesNombre = nombreArchivoConExtension.split('_');
    const nombreArchivo = partesNombre[partesNombre.length - 1];
    return nombreArchivo;
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


  private isValidModelType(file: File): boolean {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    // Verificar si la extensión es "obj"
    const allowedFileExtensions = ['obj', 'glb', 'gltf'];
    return allowedFileExtensions.includes(fileExtension);
  }

  private isValidModelFileSize(file: File): boolean {
    // Verificar si el tamaño del archivo es aceptable
    const maxSizeBytes = 300 * 1024 * 1024; // 300 MB
    return file.size <= maxSizeBytes;
  }

  private isValidTextureType(file: File): boolean {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    // Verificar si la extensión es "jpg" o "png"
    const allowedFileExtensions = ['jpg', 'png', 'jpeg'];
    return allowedFileExtensions.includes(fileExtension);
  }

  private isValidTextureFileSize(file: File): boolean {
    // Verificar si el tamaño del archivo es aceptable
    const maxSizeBytes = 25 * 1024 * 1024; // 10 MB
    return file.size <= maxSizeBytes;
  }

  validarFormulario(): boolean {
    // Inicializa todas las banderas de error a vacío
    this.ModelErrorMessageHQ = '';
    this.textureErroMessageHQ = '';
    this.ModelErrorMessageLQ = '';
    this.textureErroMessageLQ = '';
    this.regionErrorMessage = '';
    this.comunaErrorMessage = '';
    this.locationErrorMessage = '';
    this.homeErrorMessage = '';
    this.roomErrorMessage = '';
    this.bathroomErrorMessage = '';
    this.priceErrorMessage = '';
    this.streetErrorMessage = '';
    this.descriptionErrorMessage = '';
    this.imagesErrorMessage = '';
    this.errorMessage = '';
  
    let formularioValido = true; // Esta variable se establecerá en falso si algún campo no es válido
  
    // Valida cada campo individualmente y establece las banderas de error correspondientes
    if (!this.model_refHQ) {
      this.ModelErrorMessageHQ = 'Por favor, sube un modelo 3D.';
      formularioValido = false;
    }
  
    if (!this.texture_refHQ) {
      this.textureErroMessageHQ = 'Por favor, sube una textura.';
      formularioValido = false;
    }

    if (!this.model_refLQ) {
      this.ModelErrorMessageLQ = 'Por favor, sube un modelo 3D.';
      formularioValido = false;
    }

    if (!this.texture_refLQ) {
      this.textureErroMessageLQ = 'Por favor, sube una textura.';
      formularioValido = false;
    }

    if (!this.selectedRegion) {
      this.regionErrorMessage = 'Por favor, selecciona una región.';
      formularioValido = false;
    }
  
    if (!this.selectedComuna) {
      this.comunaErrorMessage = 'Por favor, selecciona una comuna.';
      formularioValido = false;
    }
  
    if (this.selectedLatitude === 0 || this.selectedLongitude === 0) {
      this.locationErrorMessage = 'Por favor, selecciona una ubicación en el mapa.';
      formularioValido = false;
    }
  
    if (!this.selectedHome) {
      this.homeErrorMessage = 'Por favor, selecciona un tipo de vivienda.';
      formularioValido = false;
    }
  
    if (!this.roomNumber || parseInt(this.roomNumber) <= 0) {
      this.roomErrorMessage = 'Por favor, ingresa un número de habitación válido.';
      formularioValido = false;
    }
  
    if (!this.roomPrice || !/^[1-9]\d*$/.test(this.roomPrice)) {
      this.priceErrorMessage = 'Por favor, ingresa un precio mensual válido en CLP.';
      formularioValido = false;
    }
  
    if (!this.roomStreet) {
      this.streetErrorMessage = 'Por favor, ingresa una dirección.';
      formularioValido = false;
    }
  
    if (!this.roomDescription) {
      this.descriptionErrorMessage = 'Por favor, ingresa una descripción.';
      formularioValido = false;
    }
  
    if (this.imagesRefs.length === 0) {
      this.imagesErrorMessage = 'Por favor, sube al menos una imagen.';
      formularioValido = false;
    }
  
    // Puedes agregar más validaciones según tus requerimientos
  
    return formularioValido;
  }

  cleanForm(){
    this.selectedRegion = '';
    this.selectedComuna = '';
    this.roomStreet = '';
    this.selectedLatitude = 0;
    this.selectedLongitude = 0;
    this.selectedHome = '';
    this.isShareBathroom = false;
    this.roomNumber = '';
    this.roomPrice = '';
    this.roomDescription = '';
    this.url_modelHQ = '';
    this.model_refHQ = '';
    this.url_modelLQ = '';
    this.model_refLQ = '';
    this.imagesRefs = [];
    this.texture_refHQ = '';
    this.texture_urlHQ = '';
    this.texture_refLQ = '';
    this.texture_urlLQ = '';
    this.cover_image_url = '';
  }
  
  onSubmit() {
    // Llama a la función para validar el formulario
    const formularioValido = this.validarFormulario();
  
    if (formularioValido) {
      // Si el formulario es válido, puedes continuar con la lógica de envío de datos o lo que sea necesario
      const room = new Room();
      // Asignar valores a la habitación
      room.region = this.selectedRegion;
      room.comuna = this.selectedComuna;
      room.casa_depto = this.selectedHome;
      room.banio_compartido = this.isShareBathroom;
      room.numero = this.roomNumber;
      room.calle = this.roomStreet;
      room.precio = this.roomPrice;
      room.descripcion = this.roomDescription;
      room.latitude = this.selectedLatitude;
      room.longitud = this.selectedLongitude;
      // Campos genéricos
      room.esta_arrendado = "false";
      room.reservas = [];
      room.fecha_publicacion = new Date(); // Fecha actual
  
      // Campos modelo 3D
      room.url_model = this.url_modelHQ; // URL del modelo
      room.model_ref_bucket = this.model_refHQ; // Nombre del archivo del modelo en el bucket
      room.url_texture = this.texture_urlHQ; // URL de la textura
      room.texture_ref_bucket = this.texture_refHQ; // Nombre del archivo de la textura en el bucket
      room.bucket_ref_imgs = this.imagesRefs; // Referencia de las imágenes en el bucket (nombre, url)
      room.url_model_LQ = this.url_modelLQ; // URL del modelo
      room.model_ref_bucket_LQ = this.model_refLQ; // Nombre del archivo del modelo en el bucket
      room.url_texture_LQ = this.texture_urlLQ; // URL de la textura
      room.texture_ref_bucket_LQ = this.texture_refLQ; // Nombre del archivo de la textura en el bucket

      //Campo imagen de portada
      this.chooseCoverImage();
      room.url_img_cover = this.cover_image_url;
      
      // Aquí puedes continuar con el proceso de envío de datos o realizar cualquier otra acción necesaria
      this.roomService.postRoom(room).subscribe(
        (res) => {
          console.log('Habitación creada con éxito:', res);
          this.cleanForm();
        },
        (error) => {
          console.error('Error al crear la habitación:', error);
        }
      );

    } else {
      // Si el formulario no es válido, puedes mostrar un mensaje de error o realizar alguna otra acción
       this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }
}
