import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationViewsComponent } from './reservation-views.component';

describe('ReservationViewsComponent', () => {
  let component: ReservationViewsComponent;
  let fixture: ComponentFixture<ReservationViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationViewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
