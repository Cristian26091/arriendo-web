import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPaymentComponent } from './payment-payment.component';

describe('PaymentPaymentComponent', () => {
  let component: PaymentPaymentComponent;
  let fixture: ComponentFixture<PaymentPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPaymentComponent ]
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
