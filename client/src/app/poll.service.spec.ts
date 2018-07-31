import { TestBed, inject } from '@angular/core/testing';

import { PollService } from './poll.service';

describe('GetPollsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PollService]
    });
  });

  it('should be created', inject([PollService], (service: PollService) => {
    expect(service).toBeTruthy();
  }));
});
