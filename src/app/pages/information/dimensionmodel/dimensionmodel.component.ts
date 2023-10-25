import { Component, OnInit, ViewChild, ElementRef, AfterViewInit   } from '@angular/core';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomService } from 'src/app/services/room.service';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';



@Component({
  selector: 'app-dimensionmodel',
  templateUrl: './dimensionmodel.component.html',
  styleUrls: ['./dimensionmodel.component.css']
})
export class DimensionmodelComponent implements OnInit, AfterViewInit {

  @ViewChild('container', { static: true }) container!: ElementRef;

  private scene: THREE.Scene = new THREE.Scene();
  public loadingProgressHQ: number = 0;
  public loadingProgressLQ: number = 0;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: THREE.OrbitControls;
  private ambientLight: THREE.AmbientLight;
  private directionalLight : THREE.DirectionalLight;
  public modelLoaded: boolean = false;
  public lqModelLoaded: boolean = false;
  public  hqModelLoaded: boolean = false;
  private lqModelDownloadTime: number = 0;

  private static instance: DimensionmodelComponent;
  private static textureLoader: THREE.TextureLoader;
  private static objLoader: OBJLoader;
  private static gltfLoader: GLTFLoader;


  constructor(public roomService: RoomService) {
    // Establecer la instancia Singleton
    DimensionmodelComponent.instance = this;
    // Inicializar cargadores Singleton
    if (!DimensionmodelComponent.textureLoader) {
      DimensionmodelComponent.textureLoader = new THREE.TextureLoader();
    }
    if (!DimensionmodelComponent.objLoader) {
      DimensionmodelComponent.objLoader = new OBJLoader();
    }
    if (!DimensionmodelComponent.gltfLoader) {
      DimensionmodelComponent.gltfLoader = new GLTFLoader();
    }
  }

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

    // Ajusta la velocidad de rotación
    this.controls.rotateSpeed = 2.0;
    // Ajusta la velocidad de zoom
    this.controls.zoomSpeed = 2.0;
    // Ajusta la velocidad de paneo
    this.controls.panSpeed = 1;

    // Agregar luces a la escena
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(1, 1, 1).normalize();
    this.scene.add(this.directionalLight);

    // Agregar fondo a la escena
    this.scene.background = new THREE.Color(0X9b9b9b);

  }

  async ngOnInit(): Promise<void> {

    this.initscene();

    const urlHQModel = this.roomService.selectedRoom.url_model.toString();
    const urlTexture = this.roomService.selectedRoom.url_texture.toString();
    const urlLQModel = this.roomService.selectedRoom.url_model_LQ?.toString();
    const urlLQTexture = this.roomService.selectedRoom.url_texture_LQ?.toString();

    if (urlLQModel) {
      // Cargar modelo LQ al principio si existe
      const startTime = performance.now();

      await this.loadLowQualityModel(urlLQModel, urlLQTexture);
  
      const endTime = performance.now();
      this.lqModelDownloadTime = endTime - startTime;
  
      if (this.lqModelDownloadTime < 5000) {
        // Si la descarga del modelo LQ es rápida, cargar el modelo HQ
        await this.loadHighQualityModel(urlHQModel, urlTexture);
      }
    } else {
      // Si no hay modelo LQ, cargar directamente el HQ
      await this.loadHighQualityModel(urlHQModel, urlTexture);
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
    this.disposeScene(this.scene);
    this.controls.dispose();
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
    const lqModel = this.scene.getObjectByName('LQ_Model');
    if (lqModel) {
      this.scene.remove(lqModel);
    }
    // Add the HQ object to the scene
    this.scene.add(hqObject);
    this.hqModelLoaded = true;
    this.loadingProgressHQ = 100;
 
 
  }

  private load3DObject(urlModel: string, urlTexture:string): Promise<THREE.Object3D> {
    return new Promise((resolve, reject) => {
      let loader: THREE.Loader;
      if (urlModel.endsWith('.glb') || urlModel.endsWith('.gltf')) {
        loader = DimensionmodelComponent.gltfLoader;
        loader.load(
          urlModel,
          (gltf) => {
            if (gltf.scene) {
              // gltf.scene.scale.set(0.5, 0.5, 0.5);
              this.scene.add(gltf.scene);
              this.modelLoaded = true;
              resolve(gltf.scene);
            }
          },
          (xhr) => {
            const percentComplete = (xhr.loaded / xhr.total) * 100;
            this.loadingProgressLQ = Math.trunc(percentComplete);
          },
          undefined,
          (error) => {
            console.error(`Error al cargar el objeto 3D: ${error}`);
            reject();
          }
        );
      }
      else if (urlModel.endsWith('.obj')){
        loader = DimensionmodelComponent.objLoader;
        loader.load(
          urlModel,
          (object ) => {
  
            //si es obj
            if (object instanceof THREE.Mesh || object instanceof THREE.Object3D){ // Verifica si es un objeto 3D
              object.traverse((child) => {
                if (child instanceof THREE.Mesh || child instanceof THREE.Group) {
                  child.scale.set(0.5, 0.5, 0.5);
                  this.loadTexture(urlTexture).then((texture) => {
                    // Cuando la textura se carga con éxito, aplica la textura al material.
                    child.material = new THREE.MeshBasicMaterial({ map: texture });
                    this.scene.add(object);
                    this.modelLoaded = true;
                    resolve(object);
                  }).catch((error) => {
                    console.error('Error al cargar la textura:', error);
                    reject();
                  });
                }
    
              });
              this.scene.add(object);
              this.modelLoaded = true;
              resolve(object);
            } 
          
            else {
              console.error('El objeto no es una instancia de THREE.Object3D.');
              reject();
            }
          },
          (xhr) => {
            const percentComplete = (xhr.loaded / xhr.total) * 100;
            this.loadingProgressLQ = Math.trunc(percentComplete);
          },
          undefined,
          (error) => {
            console.error(`Error al cargar el objeto 3D: ${error}`);
            reject();
          }
        );
      }
      else{
        console.error('El formato del modelo no es compatible.');
        reject();
      }

      
    });
  }

  private async loadTexture(urlTexture: string): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
      DimensionmodelComponent.textureLoader.load(urlTexture, (texture) => {
        resolve(texture);
      }, undefined, (error) => {
        console.error(`Error al cargar la textura: ${error}`);
        reject();
      });
    });
  }

  private disposeScene(scene: THREE.Scene): void {
    while (scene.children.length > 0) {
      const child = scene.children[0];
      if (child instanceof THREE.Mesh || child instanceof THREE.Group) {
        if (child.material instanceof THREE.Material) {
          child.material.dispose();
        }
      }
      scene.remove(child);
    }
  }
  

  
}
