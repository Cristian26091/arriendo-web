import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationStepComponent } from './registration-step.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegistrationStepComponent', () => {
  let component: RegistrationStepComponent;
  let fixture: ComponentFixture<RegistrationStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationStepComponent ],
      providers: [
        RegistrationStepComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
