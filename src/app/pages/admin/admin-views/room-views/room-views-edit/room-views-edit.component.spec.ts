import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomViewsEditComponent } from './room-views-edit.component';

describe('RoomViewsEditComponent', () => {
  let component: RoomViewsEditComponent;
  let fixture: ComponentFixture<RoomViewsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomViewsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomViewsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
