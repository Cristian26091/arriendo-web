import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionmodelComponent } from './dimensionmodel.component';

describe('DimensionmodelComponent', () => {
  let component: DimensionmodelComponent;
  let fixture: ComponentFixture<DimensionmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DimensionmodelComponent ]
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
