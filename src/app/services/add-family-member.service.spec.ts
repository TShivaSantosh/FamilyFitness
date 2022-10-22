import { TestBed } from '@angular/core/testing';

import { AddFamilyMemberService } from './add-family-member.service';

describe('AddFamilyMemberService', () => {
  let service: AddFamilyMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddFamilyMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
