import { TestBed } from '@angular/core/testing';

import { RSystemServiceService } from './storyservice.service';

describe('RSystemServiceService', () => {
  let service: RSystemServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RSystemServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
