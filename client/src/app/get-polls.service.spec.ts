import { TestBed, inject } from '@angular/core/testing';

import { GetPollsService } from './get-polls.service';

describe('GetPollsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetPollsService]
    });
  });

  it('should be created', inject([GetPollsService], (service: GetPollsService) => {
    expect(service).toBeTruthy();
  }));
});
