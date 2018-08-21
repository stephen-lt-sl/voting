import { PollsModule } from './polls.module';

describe('PollsModule', () => {
  let pollsModule: PollsModule;

  beforeEach(() => {
    pollsModule = new PollsModule();
  });

  it('should create an instance', () => {
    expect(pollsModule).toBeTruthy();
  });
});
