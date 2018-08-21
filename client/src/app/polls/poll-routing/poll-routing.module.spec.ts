import { PollRoutingModule } from './poll-routing.module';

describe('PollRoutingModule', () => {
  let pollRoutingModule: PollRoutingModule;

  beforeEach(() => {
    pollRoutingModule = new PollRoutingModule();
  });

  it('should create an instance', () => {
    expect(pollRoutingModule).toBeTruthy();
  });
});
