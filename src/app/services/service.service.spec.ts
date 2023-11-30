import { TestBed } from '@angular/core/testing';

import { ServiceService } from './service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ServiceService', () => {
  let service: ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ServiceService
      ],
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
