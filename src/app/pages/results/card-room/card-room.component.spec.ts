import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRoomComponent } from './card-room.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CardRoomComponent', () => {
  let component: CardRoomComponent;
  let fixture: ComponentFixture<CardRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardRoomComponent ],
      providers: [
        CardRoomComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
