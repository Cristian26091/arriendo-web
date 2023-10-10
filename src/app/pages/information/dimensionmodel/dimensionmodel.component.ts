import { Component, OnInit, ViewChild, ElementRef, AfterViewInit   } from '@angular/core';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-dimensionmodel',
  templateUrl: './dimensionmodel.component.html',
  styleUrls: ['./dimensionmodel.component.css']
})
export class DimensionmodelComponent implements OnInit, AfterViewInit {

  // @ViewChild('canvas') canvasRef: ElementRef<HTMLCanvasElement>;
  @ViewChild('container', { static: true }) container!: ElementRef;

  private scene: THREE.Scene = new THREE.Scene();

  public loadingProgress: number = 0;


  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: THREE.OrbitControls;
  
  private ambientLight: THREE.AmbientLight;
  private directionalLight : THREE.DirectionalLight;

  public modelLoaded: boolean = false;

  constructor(public roomService: RoomService) {
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
    console.log("roomService.selectedRoom:",this.roomService.selectedRoom);
    this.initscene();
    // Aquí puedes acceder al canvas utilizando la referencia container
    console.log("url modelo:"+(this.roomService.selectedRoom.url_model).toString());
    this.load3DObject((this.roomService.selectedRoom.url_model).toString());

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
    // Aquí puedes acceder al canvas utilizando la referencia container
    // console.log(this.container.nativeElement);
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

  private load3DObject(url: string): Promise<THREE.Object3D> {
    this.modelLoaded = false;// set on false at the init
    return new Promise((resolve, reject) => {
      const loader = new OBJLoader();
      loader.load(
        url,
        (object) => {
          object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              object.scale.set(0.5, 0.5, 0.5);
              this.scene.add(object);
              // Cargar la textura y asignarla al material
              const textureLoader = new THREE.TextureLoader();
              const texture = textureLoader.load((this.roomService.selectedRoom.url_texture).toString());
              child.material = new THREE.MeshBasicMaterial({ map: texture });
              this.modelLoaded = true;// set on true when the model is loaded
              this.loadingProgress = 100; // Modelo completamente cargado
            }
          });
          resolve(object);
        },
        (xhr) => {
          // console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
          const percentComplete = (xhr.loaded / xhr.total) * 100;
          this.loadingProgress =  Math.trunc(percentComplete);
        },
        (error) => {
          console.error(`Error al cargar el objeto 3D: ${error}`);
        },
        undefined, 
        reject);

    });
  }

  
}
