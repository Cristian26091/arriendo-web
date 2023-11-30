import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsComponentComponent } from './results-component.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ResultsComponentComponent', () => {
  let component: ResultsComponentComponent;
  let fixture: ComponentFixture<ResultsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsComponentComponent ],
      providers: [
        ResultsComponentComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
