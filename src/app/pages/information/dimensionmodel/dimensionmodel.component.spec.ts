import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionmodelComponent } from './dimensionmodel.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DimensionmodelComponent', () => {
  let component: DimensionmodelComponent;
  let fixture: ComponentFixture<DimensionmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DimensionmodelComponent ],
      providers: [
        DimensionmodelComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DimensionmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
