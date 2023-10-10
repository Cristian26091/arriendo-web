  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http'
  import { Room } from '../models/room';
  import { Observable, forkJoin  } from 'rxjs';
  import { environment } from '../../environments/environment';
  import { ImageRef } from '../models/image-ref';

  @Injectable({
    providedIn: 'root'
  })
  export class RoomService {
    selectedRoom: Room = new Room();
    rooms: Room[] = [];

    readonly URL_API = environment.uri+'/api/room'
    readonly URL_FILTER_ROOM = environment.uri+'/api'
    readonly URL_POST_ROOM = environment.uri+'/api/uploadRoom'
    readonly URL_UPLOAD_MODEL = environment.uri + '/api/uploadModel';
    readonly URL_DELETE_MODEL = environment.uri + '/api/deleteModel';
    readonly URL_UPLOAD_IMAGES = environment.uri + '/api/uploadImages';
    readonly URL_DELETE_IMAGES = environment.uri + '/api/deleteImages';
    readonly URL_UPLOAD_TEXTURE = environment.uri + '/api/uploadTexture';
    readonly URL_DELETE_TEXTURE = environment.uri + '/api/deleteTexture';

    constructor(private http: HttpClient){}

    //función para subir el modelo 3D
    uploadModelFile(file: File): Observable<any> {
      const formData = new FormData();
      formData.append('model', file);
      console.log("formData",formData)
      return this.http.post(this.URL_UPLOAD_MODEL, formData);
    }

    //función para eliminar un modelo 3D del bucket
    deleteModelFile(model_ref: string): Observable<any> {
      // console.log("model_ref",model_ref)
      return this.http.delete(this.URL_DELETE_MODEL + `/${model_ref}`);
    }

    //función para subir la imagen de portada
    uploadImagesFiles(files: File[]): Observable<any> {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]); // Usamos un array para manejar múltiples archivos
      }
      // console.log("formData",formData)
      return this.http.post(this.URL_UPLOAD_IMAGES, formData);
    }

    //función para eliminar las imagenes cargadas al bucket
    deleteImagesFiles(images_ref: ImageRef[]): Observable<any> {
      console.log("images_ref", images_ref);
      const imageNames = images_ref.map(image => image.nombre);
      const deleteRequests = imageNames.map((imageName) => {
        const url = `${this.URL_DELETE_IMAGES}/${imageName}`;
        return this.http.delete(url);
      });
      // Usar forkJoin para enviar todas las solicitudes DELETE al mismo tiempo
      return forkJoin(deleteRequests);
    }

    //función para subir la textura del modelo
    uploadTextureFile(file: File): Observable<any> {
      const formData = new FormData();
      formData.append('texture', file);
      // console.log("formData",formData)
      return this.http.post(this.URL_UPLOAD_TEXTURE, formData);
    }

    //función para eliminar una textura del bucket
    deleteTextureFile(texture_ref: string): Observable<any> {
      // console.log("texture_ref",texture_ref)
      return this.http.delete(this.URL_DELETE_TEXTURE + `/${texture_ref}`);
    }

    getRooms(){
      return this.http.get(this.URL_API);
    }

    getRoom(_id: string) : Observable<any>{
      return this.http.get(this.URL_API+`/${_id}`);
    }

    getRoomById(_id: string): Room {
      return this.rooms.find(room => room._id === _id);
    }

    getRoomByFilter (req: any): Observable<any[]>{
      let params = {
        region: "",
        comuna: "",
        casa_depto: "",
      };
      // if (req.disponible !== undefined && req.disponible !== true) {
      //   params += `esta_arrendado=${req.disponible}&`;
      // }
      if (req.region !== undefined) {
        params.region = req.region;
      }
      if (req.comuna !== undefined) {
        params.comuna = req.comuna;
      }
      if (req.casa_depto !== undefined) {
        params.casa_depto = req.casa_depto;
      }
      // console.log("Imprimir query:", params);

      return this.http.get<any[]>(`${this.URL_FILTER_ROOM}/filterRooms/`, { params });
    
    }

    postRoom(room: Room): Observable<any> {
      return this.http.post(`${this.URL_POST_ROOM}`, room);
    }

    putRoom(room: Room){
      
    }

    deleteRoom(_id: string): Observable<any> {
      return this.http.delete(`${this.URL_API}/${_id}`);
    }

    roomsIsVoid(){
      return this.rooms.length === 0;
    }

  }
