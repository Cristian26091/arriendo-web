import { TestBed } from '@angular/core/testing';

import { HeelpService } from './heelp.service';

describe('HeelpService', () => {
  let service: HeelpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeelpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
