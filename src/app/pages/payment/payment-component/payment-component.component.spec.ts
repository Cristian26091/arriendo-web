import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentComponentComponent } from './payment-component.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PaymentComponentComponent', () => {
  let component: PaymentComponentComponent;
  let fixture: ComponentFixture<PaymentComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentComponentComponent ],
      providers: [
        PaymentComponentComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
