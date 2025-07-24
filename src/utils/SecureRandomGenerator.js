// File: src/utils/SecureRandomGenerator.js
import crypto from 'crypto';

export class SecureRandomGenerator {
  static generateKey(length = 32) {
    return crypto.randomBytes(length).toString('hex');
  }

  // Alias for generateKey (to fix missing getRandomHex)
  static getRandomHex(length = 32) {
    return this.generateKey(length);
  }

  static rollDie(die) {
    const randIndex = this.getSecureRandomInt(0, die.length - 1);
    return die[randIndex];
  }

  static getSecureRandomInt(min, max) {
    if (min > max) throw new Error('Invalid range');
    const range = max - min + 1;
    const maxValid = 256 - (256 % range);
    let rand;
    do {
      rand = crypto.randomBytes(1)[0];
    } while (rand >= maxValid);
    return min + (rand % range);
  }
  

  static getRandomInt(min, max) {
    return this.getSecureRandomInt(min, max);
  }

  static generateInt(range) {
    if (range <= 0) throw new Error('Range must be positive');
    const maxValid = 256 - (256 % range);
    let rand;
    do {
      rand = crypto.randomBytes(1)[0];
    } while (rand >= maxValid);
    return rand % range;
  }
}
