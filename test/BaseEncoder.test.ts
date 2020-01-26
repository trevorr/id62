import { expect } from 'chai';
import { BaseEncoder } from '../src/BaseEncoder';

const binary = new BaseEncoder('01');
const hex = new BaseEncoder('0123456789abcdef');
const base62 = new BaseEncoder('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');

describe('BaseEncoder', () => {
  it('encodes binary', () => {
    expect(binary.encode(Buffer.alloc(2), 16)).to.equal('0000000000000000');
    expect(binary.encode(Buffer.alloc(2, 0xff), 16)).to.equal('1111111111111111');
    expect(binary.encode(Buffer.from([0x97, 0xc5]), 16)).to.equal('1001011111000101');
  });
  it('handles an empty buffer', () => {
    expect(binary.encode(Buffer.alloc(0), 0)).to.equal('');
  });
  it('ignores extra buffer', () => {
    expect(binary.encode(Buffer.alloc(10), 10)).to.equal('0000000000');
    expect(binary.encode(Buffer.alloc(10, 0xff), 10)).to.equal('1111111111');
  });
  it('zero-extends short buffer', () => {
    expect(binary.encode(Buffer.alloc(1), 20)).to.equal('00000000000000000000');
    expect(binary.encode(Buffer.alloc(1, 0xff), 20)).to.equal('11111111000000000000');
  });
  it('encodes hexadecimal', () => {
    expect(hex.encode(Buffer.alloc(2), 16)).to.equal('0000');
    expect(hex.encode(Buffer.alloc(2, 0xff), 16)).to.equal('ffff');
    expect(hex.encode(Buffer.from([0x97, 0xc5]), 16)).to.equal('97c5');
  });
  it('encodes base 62', () => {
    expect(base62.encode(Buffer.alloc(2), 16)).to.equal('000');
    expect(base62.encode(Buffer.alloc(2, 0xff), 16)).to.equal('H31');
    expect(base62.encode(Buffer.from([0x97, 0xc5]), 16)).to.equal('A6f');
  });
});
