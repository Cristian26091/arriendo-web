import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCarrouselComponent } from './index-carrousel.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('IndexCarrouselComponent', () => {
  let component: IndexCarrouselComponent;
  let fixture: ComponentFixture<IndexCarrouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCarrouselComponent ],
      providers: [
        IndexCarrouselComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
