import { ToColorStringPipe } from './to-color-string.pipe';

describe('ToColorStringPipe', () => {
  it('create an instance', () => {
    const pipe = new ToColorStringPipe();
    expect(pipe).toBeTruthy();
  });
});
