import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomImageSliderComponent } from './room-image-slider.component';

describe('RoomImageSliderComponent', () => {
  let component: RoomImageSliderComponent;
  let fixture: ComponentFixture<RoomImageSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomImageSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomImageSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
