import { CustomerFilterPipe } from './customer-filter.pipe';

describe('CustomerFilter', () => {
  it('create an instance', () => {
    const pipe = new CustomerFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
