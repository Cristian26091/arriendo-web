import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomViewsEditComponent } from './room-views-edit.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RoomViewsEditComponent', () => {
  let component: RoomViewsEditComponent;
  let fixture: ComponentFixture<RoomViewsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomViewsEditComponent ],
      providers: [
        RoomViewsEditComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
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
