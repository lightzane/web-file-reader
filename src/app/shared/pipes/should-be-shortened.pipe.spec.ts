import { ShouldBeShortenedPipe } from './should-be-shortened.pipe';

describe('ShouldBeShortenedPipe', () => {
  it('create an instance', () => {
    const pipe = new ShouldBeShortenedPipe();
    expect(pipe).toBeTruthy();
  });
});
