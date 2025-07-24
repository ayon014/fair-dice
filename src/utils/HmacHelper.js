// src/utils/HmacHelper.js
import crypto from 'crypto';

export class HmacHelper {
  static calculate(keyHex, message) {
    const key = Buffer.from(keyHex, 'hex');
    return crypto.createHmac('sha3-256', key).update(message).digest('hex');
  }

  static verify(keyHex, message, hmac) {
    return this.calculate(keyHex, message) === hmac;
  }
}

