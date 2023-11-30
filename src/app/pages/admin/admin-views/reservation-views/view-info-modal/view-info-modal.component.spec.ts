import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewInfoModalComponent } from './view-info-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';



describe('ViewInfoModalComponent', () => {
  let component: ViewInfoModalComponent;
  let fixture: ComponentFixture<ViewInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInfoModalComponent ],
      providers: [
        ViewInfoModalComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
