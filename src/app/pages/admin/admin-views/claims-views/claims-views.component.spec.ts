import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsViewsComponent } from './claims-views.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClaimsViewsComponent', () => {
  let component: ClaimsViewsComponent;
  let fixture: ComponentFixture<ClaimsViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimsViewsComponent ],
      providers: [
        ClaimsViewsComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimsViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
