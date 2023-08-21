import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsViewsComponent } from './claims-views.component';

describe('ClaimsViewsComponent', () => {
  let component: ClaimsViewsComponent;
  let fixture: ComponentFixture<ClaimsViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimsViewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimsViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
