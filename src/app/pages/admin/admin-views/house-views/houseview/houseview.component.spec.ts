import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseviewComponent } from './houseview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HouseviewComponent', () => {
  let component: HouseviewComponent;
  let fixture: ComponentFixture<HouseviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseviewComponent ],
      providers: [
        HouseviewComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
