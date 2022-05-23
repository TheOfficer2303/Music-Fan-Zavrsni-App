import { TestBed } from '@angular/core/testing';

import { OrchestraService } from './orchestra.service';

describe('OrchestraService', () => {
  let service: OrchestraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrchestraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
