import assert from 'assert';

export class BaseEncoder {
  private readonly base: number;
  private readonly bitsPerDigit: number;

  public constructor(private digits: string) {
    assert(digits.length >= 2 && digits.length <= 256);
    this.base = digits.length;
    this.bitsPerDigit = Math.log(this.base) / Math.log(2);
  }

  public encode(buffer: Buffer, bitLength: number): string {
    const { base, digits } = this;
    const resultLength = Math.ceil(bitLength / this.bitsPerDigit);
    const accum = new Uint8Array(resultLength);
    let accumLength = 0;
    let lshift = 8;
    // loop over the input a byte at a time
    for (let bufferIndex = 0, bitsLeft = bitLength; bitsLeft > 0; ++bufferIndex, bitsLeft -= 8) {
      let carry = buffer[bufferIndex] || 0;
      // mask any extra bits off last byte
      if (bitsLeft < 8) {
        carry &= (1 << bitsLeft) - 1;
        lshift = bitsLeft;
      }
      // left shift accumulator and add new bits
      let i = 0;
      for (let rawIndex = resultLength - 1; carry !== 0 || i < accumLength; --rawIndex, ++i) {
        carry += accum[rawIndex] << lshift;
        accum[rawIndex] = carry % base;
        carry = (carry / base) >>> 0;
      }
      accumLength = i;
    }
    // translate numeric result to target alphabet
    let result = '';
    for (let i = 0; i < resultLength; ++i) {
      result += digits[accum[i]];
    }
    return result;
  }
}
