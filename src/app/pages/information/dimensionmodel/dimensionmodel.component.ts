import { Component, OnInit, ViewChild, ElementRef, AfterViewInit   } from '@angular/core';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomService } from 'src/app/services/room.service';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { ConnectionSpeedServiceService } from '../../../services/connection-speed-service.service';



@Component({
  selector: 'app-dimensionmodel',
  templateUrl: './dimensionmodel.component.html',
  styleUrls: ['./dimensionmodel.component.css']
})
export class DimensionmodelComponent implements OnInit, AfterViewInit {

  // @ViewChild('canvas') canvasRef: ElementRef<HTMLCanvasElement>;
  @ViewChild('container', { static: true }) container!: ElementRef;

  private scene: THREE.Scene = new THREE.Scene();

  // public loadingProgress: number = 0;

  public loadingProgressHQ: number = 0;
  public loadingProgressLQ: number = 0;


  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: THREE.OrbitControls;
  
  private ambientLight: THREE.AmbientLight;
  private directionalLight : THREE.DirectionalLight;

  public modelLoaded: boolean = false;
  public lqModelLoaded: boolean = false;


  constructor(public roomService: RoomService, ) {}

  private initscene() {

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 1);
    this.renderer = new THREE.WebGLRenderer({antialias : true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.nativeElement.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;

    // Agregar luces a la escena
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(1, 1, 1).normalize();
    this.scene.add(this.directionalLight);

    // Agregar fondo a la escena
    this.scene.background = new THREE.Color(0X9b9b9b);

  }

  ngOnInit(): void {

    this.initscene();

    //revisamos si el modelo tiene una version LQ (temporalmente para los modelos que ya tengo implementado y no tienen una versión lq)
    if(this.roomService.selectedRoom.url_model_LQ == null || this.roomService.selectedRoom.url_model_LQ == undefined){
      const urlHQModel = this.roomService.selectedRoom.url_model.toString();
      const urlHQTexture = this.roomService.selectedRoom.url_texture.toString();
      this.loadHighQualityModel(urlHQModel, urlHQTexture);
    }
    //luego de verificar que tenga una versión LQ se carga el modelo LQ
    else{
      const urlLQModel = this.roomService.selectedRoom.url_model_LQ.toString();
      const urlLQTexture = this.roomService.selectedRoom.url_texture_LQ.toString();
      const urlHQModel = this.roomService.selectedRoom.url_model.toString();
      const urlHQTexture = this.roomService.selectedRoom.url_texture.toString();

      //mido la el tiempo de descarga del modelo LQ
      const startTime = performance.now();

      this.loadLowQualityModel(urlLQModel,urlLQTexture); // Cargar modelo LQ al principio

      const endTime = performance.now();
      const downloadTime = endTime - startTime;

      // console.log("tiempo en milisegundos de descarga del modelo LQ: " + downloadTime);

      //si la descarga del modelo Low Quality es mayor a 5 segundos, se carga el modelo High Quality
      if(downloadTime < 5000){
        this.loadHighQualityModel(urlHQModel,urlHQTexture); // Cargar modelo HQ al principio
      }
    }
  
    // Escucha el evento de cambio de tamaño de la ventana y ajusta el renderizador
    window.addEventListener('resize', () => {
      const containerElement = this.container.nativeElement;
      const newWidth = containerElement.clientWidth;
      const newHeight = containerElement.clientHeight;

      this.camera.aspect = newWidth / newHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(newWidth, newHeight);

      this.controls.update(); // Actualiza los controles
    });

    // Inicialmente, configura el tamaño del renderizador según el tamaño del contenedor
    const containerElement = this.container.nativeElement;
    const initialWidth = containerElement.clientWidth;
    const initialHeight = containerElement.clientHeight;

    this.camera.aspect = initialWidth / initialHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(initialWidth, initialHeight);

    this.camera.lookAt(0, 0, 0);

    this.animate();
  }

  ngAfterViewInit(): void {
    
  }

  ngOnDestroy() {
    while (this.scene.children.length > 0) {
      const child = this.scene.children[0];
      if (child instanceof THREE.Mesh) {
        // Si es un Mesh, elimina su material para liberar recursos
        if (child.material instanceof THREE.Material) {
          child.material.dispose();
        }
      }
      this.scene.remove(child);
    }
    this.controls.dispose();
    this.renderer.dispose();
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

  // ----------------------------- LOADS -------------------------------
  private async loadLowQualityModel(urlModel: string, urlTexture: string): Promise<void> {
    const lqObject = await this.load3DObject(urlModel, urlTexture);
    lqObject.name = 'LQ_Model';
    this.scene.add(lqObject);
    this.lqModelLoaded = true;
    this.loadingProgressLQ = 100;
  }

  private async loadHighQualityModel(urlModel: string, urlTexture: string): Promise <void> {
    const hqObject = await this.load3DObject(urlModel, urlTexture);
    hqObject.name = 'HQ_Model';
    // Remove the LQ version from the scene if present
    this.scene.children.forEach((child) => {
      if (child.name === 'LQ_Model') {
        this.scene.remove(child);
      }
    });
    // Add the HQ object to the scene
    this.scene.add(hqObject);
    this.modelLoaded = true;
    this.loadingProgressHQ = 100;
 
  }

  private load3DObject(urlModel: string, urlTexture:string): Promise<THREE.Object3D> {
    // Reset progress based on the type of model
    if (urlModel.endsWith('.obj')) {
      this.loadingProgressLQ = 0; // Reset LQ progress
      this.loadingProgressHQ = 0; // Reset HQ progress
    } else {
      this.loadingProgressHQ = 0; // Reset HQ progress
      this.loadingProgressLQ = 0; // Reset LQ progress
    }

    this.modelLoaded = false;
    return new Promise((resolve, reject) => {

      if (urlModel.endsWith('.obj')) {
        const loader = new OBJLoader();
        loader.load(
          urlModel,
          (object) => {
            object.traverse((child) => {

              if (child instanceof THREE.Mesh || child instanceof THREE.Group) {
                child.scale.set(0.5, 0.5, 0.5);
                this.scene.add(object);
                const textureLoader = new THREE.TextureLoader();
                const texture = textureLoader.load(urlTexture);
                child.material = new THREE.MeshBasicMaterial({ map: texture });
                this.modelLoaded = true;
                // Update the loading progress based on the type of model
                if (urlModel.endsWith('.obj')) {
                  this.loadingProgressLQ = 100; // LQ is fully loaded
                } else {
                  this.loadingProgressHQ = 100; // HQ is fully loaded
                }
              }
            });
            resolve(object);
          },
          (xhr) => {
            const percentComplete = (xhr.loaded / xhr.total) * 100;
            // Update the loading progress based on the type of model
            if (urlModel.endsWith('.obj')) {
              this.loadingProgressLQ = Math.trunc(percentComplete);
            } else {
              this.loadingProgressHQ = Math.trunc(percentComplete);
            }
          },
          undefined,
          (error) => {
            console.error(`Error al cargar el objeto 3D: ${error}`);
          },
          reject
        );
        
      } else if (urlModel.endsWith('.glb') || urlModel.endsWith('.gltf')) {
          const loader = new GLTFLoader();
          loader.load(
            urlModel,
            (gltf) => {
              const object = gltf.scene;
              object.scale.set(0.5, 0.5, 0.5);
              this.scene.add(object);
              this.modelLoaded = true;
              // Update the loading progress based on the type of model
              if (urlModel.endsWith('.obj')) {
                this.loadingProgressLQ = 100; // LQ is fully loaded
              } else {
                this.loadingProgressHQ = 100; // HQ is fully loaded
              }
              resolve(object);
            },
            (xhr) => {
              const percentComplete = (xhr.loaded / xhr.total) * 100;
              // Update the loading progress based on the type of model
              if (urlModel.endsWith('.glb') || urlModel.endsWith('.gltf')) {
                this.loadingProgressLQ = Math.trunc(percentComplete);
              } else {
                this.loadingProgressHQ = Math.trunc(percentComplete);
              }
            },
            (error) => {
              console.error(`Error al cargar el objeto 3D: ${error}`);
            },
            reject
          );
      } else {
        console.error(`Formato de archivo no admitido: ${urlModel}`);
        reject();
      }
    });
  }
  

  
}
