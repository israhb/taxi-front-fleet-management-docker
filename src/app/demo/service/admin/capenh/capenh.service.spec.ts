import { TestBed } from '@angular/core/testing';

import { CapenhService } from './capenh.service';

describe('CapenhService', () => {
  let service: CapenhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapenhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
