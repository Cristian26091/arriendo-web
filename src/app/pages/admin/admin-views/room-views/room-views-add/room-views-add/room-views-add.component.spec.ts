import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomViewsAddComponent } from './room-views-add.component';

describe('RoomViewsAddComponent', () => {
  let component: RoomViewsAddComponent;
  let fixture: ComponentFixture<RoomViewsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomViewsAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomViewsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
