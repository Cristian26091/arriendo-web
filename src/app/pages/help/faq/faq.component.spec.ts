import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQComponent } from './faq.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FAQComponent', () => {
  let component: FAQComponent;
  let fixture: ComponentFixture<FAQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FAQComponent ],
      providers: [
        FAQComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
