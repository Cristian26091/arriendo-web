import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomMateCardComponent } from './room-mate-card.component';

describe('RoomMateCardComponent', () => {
  let component: RoomMateCardComponent;
  let fixture: ComponentFixture<RoomMateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomMateCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomMateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
