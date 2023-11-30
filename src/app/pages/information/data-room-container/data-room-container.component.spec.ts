import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRoomContainerComponent } from './data-room-container.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DataRoomContainerComponent', () => {
  let component: DataRoomContainerComponent;
  let fixture: ComponentFixture<DataRoomContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataRoomContainerComponent ],
      providers: [
        DataRoomContainerComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
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
