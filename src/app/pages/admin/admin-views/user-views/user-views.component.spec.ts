import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewsComponent } from './user-views.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserViewsComponent', () => {
  let component: UserViewsComponent;
  let fixture: ComponentFixture<UserViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewsComponent ],
      providers: [
        UserViewsComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
