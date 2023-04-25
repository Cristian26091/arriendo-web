import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRoomContainerComponent } from './data-room-container.component';

describe('DataRoomContainerComponent', () => {
  let component: DataRoomContainerComponent;
  let fixture: ComponentFixture<DataRoomContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataRoomContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataRoomContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
