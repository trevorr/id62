import { BaseEncoder } from "./BaseEncoder";

const base62 = new BaseEncoder(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
);

export function id62(): string {
  const bytes = new Uint8Array(16);
  globalThis.crypto.getRandomValues(bytes);
  return base62.encode(bytes, 122);
}

export default id62;
