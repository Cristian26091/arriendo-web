import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      providers: [
        MapComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
