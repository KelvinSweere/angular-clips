import { FbTimestampPipe } from './fb-timestamp.pipe';

describe('FbTimestampPipe', () => {
  it('create an instance', () => {
    const datePipe = new DatePipe('en-US');
    const pipe = new FbTimestampPipe(datePipe);
    expect(pipe).toBeTruthy();
  });
});
