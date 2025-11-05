import { describe, it } from "node:test";
import * as assert from "node:assert/strict";
import { BaseEncoder } from "../src/BaseEncoder";

const binary = new BaseEncoder("01");
const hex = new BaseEncoder("0123456789abcdef");
const base62 = new BaseEncoder(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
);

void describe("BaseEncoder", () => {
  void it("validates digit string length", () => {
    // Test that constructor accepts valid lengths (2-256)
    assert.doesNotThrow(() => new BaseEncoder("01")); // minimum: 2
    assert.doesNotThrow(() => new BaseEncoder("0".repeat(256))); // maximum: 256
    // Test that constructor rejects invalid lengths
    assert.throws(() => new BaseEncoder("0")); // too short: 1
    assert.throws(() => new BaseEncoder("0".repeat(257))); // too long: 257
  });

  void it("encodes binary", () => {
    assert.equal(binary.encode(new Uint8Array(2), 16), "0000000000000000");
    assert.equal(
      binary.encode(new Uint8Array(2).fill(0xff), 16),
      "1111111111111111",
    );
    assert.equal(
      binary.encode(new Uint8Array([0x97, 0xc5]), 16),
      "1001011111000101",
    );
  });

  void it("handles an empty buffer", () => {
    assert.equal(binary.encode(new Uint8Array(0), 0), "");
  });

  void it("ignores extra buffer", () => {
    assert.equal(binary.encode(new Uint8Array(10), 10), "0000000000");
    assert.equal(
      binary.encode(new Uint8Array(10).fill(0xff), 10),
      "1111111111",
    );
  });

  void it("zero-extends short buffer", () => {
    assert.equal(binary.encode(new Uint8Array(1), 20), "00000000000000000000");
    assert.equal(
      binary.encode(new Uint8Array(1).fill(0xff), 20),
      "11111111000000000000",
    );
  });

  void it("encodes hexadecimal", () => {
    assert.equal(hex.encode(new Uint8Array(2), 16), "0000");
    assert.equal(hex.encode(new Uint8Array(2).fill(0xff), 16), "ffff");
    assert.equal(hex.encode(new Uint8Array([0x97, 0xc5]), 16), "97c5");
  });

  void it("encodes base 62", () => {
    assert.equal(base62.encode(new Uint8Array(2), 16), "000");
    assert.equal(base62.encode(new Uint8Array(2).fill(0xff), 16), "H31");
    assert.equal(base62.encode(new Uint8Array([0x97, 0xc5]), 16), "A6f");
  });
});
