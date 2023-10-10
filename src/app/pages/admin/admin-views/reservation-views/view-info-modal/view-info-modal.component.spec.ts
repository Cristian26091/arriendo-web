import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInfoModalComponent } from './view-info-modal.component';

describe('ViewInfoModalComponent', () => {
  let component: ViewInfoModalComponent;
  let fixture: ComponentFixture<ViewInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInfoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
