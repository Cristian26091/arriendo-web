import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpComponentComponent } from './help-component.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HelpComponentComponent', () => {
  let component: HelpComponentComponent;
  let fixture: ComponentFixture<HelpComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpComponentComponent ],
      providers: [
        HelpComponentComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
