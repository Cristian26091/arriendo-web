import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormHouseComponent } from './add-form-house.component';

describe('AddFormHouseComponent', () => {
  let component: AddFormHouseComponent;
  let fixture: ComponentFixture<AddFormHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFormHouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFormHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
