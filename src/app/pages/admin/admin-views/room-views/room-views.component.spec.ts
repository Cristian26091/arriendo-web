import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomViewsComponent } from './room-views.component';

describe('RoomViewsComponent', () => {
  let component: RoomViewsComponent;
  let fixture: ComponentFixture<RoomViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomViewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
