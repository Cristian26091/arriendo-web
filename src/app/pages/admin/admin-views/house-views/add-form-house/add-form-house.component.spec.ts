import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormHouseComponent } from './add-form-house.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddFormHouseComponent', () => {
  let component: AddFormHouseComponent;
  let fixture: ComponentFixture<AddFormHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFormHouseComponent ],
      providers: [
        AddFormHouseComponent
      ],
      imports: [
        HttpClientTestingModule
      ]
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
