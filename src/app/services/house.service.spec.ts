import { TestBed } from '@angular/core/testing';

import { HouseService } from './house.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HouseService', () => {
  let service: HouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HouseService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(HouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
