import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPaymentComponent } from './payment-payment.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PaymentPaymentComponent', () => {
  let component: PaymentPaymentComponent;
  let fixture: ComponentFixture<PaymentPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPaymentComponent ],
      providers: [
        PaymentPaymentComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
