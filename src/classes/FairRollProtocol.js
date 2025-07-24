// src/classes/FairRollProtocol.js
import { SecureRandomGenerator } from '../utils/SecureRandomGenerator.js';
import { HmacHelper } from '../utils/HmacHelper.js';

export class FairRollProtocol {
  constructor(range) {
    this.range = range;
    this.secretKey = null;
    this.computerNumber = null;
    this.hmac = null;
  }

  prepareComputerTurn() {
    this.secretKey = SecureRandomGenerator.generateKey();
    this.computerNumber = SecureRandomGenerator.generateInt(this.range);
    this.hmac = HmacHelper.calculate(this.secretKey, this.computerNumber.toString());
    return this.hmac;
  }

  reveal(userNumber) {
    const result = (this.computerNumber + userNumber) % this.range;
    const valid = HmacHelper.verify(this.secretKey, this.computerNumber.toString(), this.hmac);
    return {
      computerNumber: this.computerNumber,
      secretKey: this.secretKey,
      hmac: this.hmac,
      valid,
      result,
    };
  }
}
