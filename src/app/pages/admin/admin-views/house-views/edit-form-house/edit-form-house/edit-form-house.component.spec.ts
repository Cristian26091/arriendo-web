import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormHouseComponent } from './edit-form-house.component';

describe('EditFormHouseComponent', () => {
  let component: EditFormHouseComponent;
  let fixture: ComponentFixture<EditFormHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFormHouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
