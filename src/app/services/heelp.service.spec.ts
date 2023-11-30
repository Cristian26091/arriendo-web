import { TestBed } from '@angular/core/testing';

import { HeelpService } from './heelp.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HeelpService', () => {
  let service: HeelpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeelpService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(HeelpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
