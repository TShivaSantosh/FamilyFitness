import { TestBed } from '@angular/core/testing';

import { AvailableTrackersService } from './available-trackers.service';

describe('AvailableTrackersService', () => {
  let service: AvailableTrackersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableTrackersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
