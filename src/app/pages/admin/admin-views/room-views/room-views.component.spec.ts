import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomViewsComponent } from './room-views.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RoomViewsComponent', () => {
  let component: RoomViewsComponent;
  let fixture: ComponentFixture<RoomViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomViewsComponent ],
      providers: [
        RoomViewsComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
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
