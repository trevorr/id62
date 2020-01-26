import crypto from 'crypto';
import { BaseEncoder } from './BaseEncoder';

const base62 = new BaseEncoder('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');

export default function id62(): string {
  return base62.encode(crypto.randomBytes(16), 122);
}
