import { TestBed } from '@angular/core/testing';

import { ManageTrackersService } from './manage-tracker.service';

describe('ManageTrackersService', () => {
  let service: ManageTrackersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageTrackersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
