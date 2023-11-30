import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormHouseComponent } from './edit-form-house.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { House } from 'src/app/models/house';

const houseTest: House = {
  _id: '1',
  fecha_publicacion: new Date('2023-01-01'),
  fecha_termino: new Date('2023-12-31'),
  precio: '100000',
  duenio: 'John Doe',
  nombrePropiedad: 'Casa de prueba',
  numHabitaciones: 3,
  numBanios: 2,
  tieneEstacionamiento: true,
  region: 'Región de Prueba',
  comuna: 'Comuna de Prueba',
  calle: 'Calle de Prueba'
};

export default houseTest;

describe('EditFormHouseComponent', () => {
  let component: EditFormHouseComponent;
  let fixture: ComponentFixture<EditFormHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFormHouseComponent ],
      providers: [
        EditFormHouseComponent
      ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormHouseComponent);
    component = fixture.componentInstance;
    component.house = houseTest;
    component.fechaTermino = '2023-12-31';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
