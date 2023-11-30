import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomMateCardComponent } from './room-mate-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RoomMateCardComponent', () => {
  let component: RoomMateCardComponent;
  let fixture: ComponentFixture<RoomMateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomMateCardComponent ],
      providers: [
        RoomMateCardComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
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
