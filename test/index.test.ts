import { expect } from 'chai';
import id62 from '../src';

describe('id62', () => {
  it('returns 21 alphanumeric digits', () => {
    expect(id62()).to.match(/[0-9A-za-z]{21}/);
  });
});
