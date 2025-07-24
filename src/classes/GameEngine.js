// File: src/classes/GameEngine.js

import { DiceParser } from './DiceParser.js';
import { ProbabilityMatrix } from './ProbabilityMatrix.js';
import { TableRenderer } from './TableRenderer.js';
import { CliMenu } from './CliMenu.js';
import { HmacHelper } from '../utils/HmacHelper.js';
import { SecureRandomGenerator } from '../utils/SecureRandomGenerator.js';
import readline from 'readline';

export class GameEngine {
  static async run(rawArgs) {
    try {
      CliMenu.printWelcomeMessage();

      // Step 1: Parse dice from CLI args
      if (!rawArgs || rawArgs.length < 2) {
        CliMenu.printUsageInstructions();
        process.exit(1);
      }

      const diceArray = DiceParser.parse(rawArgs);
      CliMenu.printDiceSummary(diceArray);

      // Step 2: Calculate and render win matrix
      const matrix = ProbabilityMatrix.calculateWinProbabilities(diceArray);
      const labels = diceArray.map((_, i) => `Die ${i + 1}`);
      TableRenderer.renderProbabilityMatrix(labels, matrix);

      // Step 3: Provably fair method to decide who picks first
      const bit = SecureRandomGenerator.getRandomInt(0, 1); // 0 or 1 inclusive
      const key = SecureRandomGenerator.getRandomHex(32); // 256-bit key
      const commitment = HmacHelper.calculate(key, bit.toString());

      console.log('\n🎲 Provably Fair First Move Commitment:');
      console.log('HMAC (commitment):', commitment);

      // Wait for user acknowledgment
      await GameEngine.waitForEnter('\nPress ENTER to reveal who chooses first...');

      console.log('\n🗝️ Revealing secret...');
      console.log('Bit:', bit);
      console.log('Key:', key);
      const isValid = HmacHelper.verify(key, bit.toString(), commitment);
      console.log(`✅ Commitment verification: ${isValid ? 'VALID' : 'INVALID'}`);

      if (!isValid) {
        throw new Error('HMAC verification failed. Something went wrong.');
      }

      const userChoosesFirst = bit === 0;
      console.log(userChoosesFirst ? '\n👤 You choose your die first!' : '\n💻 Computer chooses first!');

     // Step 4: Die selection
let firstPlayerDieIndex, secondPlayerDieIndex;

if (userChoosesFirst) {
  firstPlayerDieIndex = await GameEngine.promptUserDieChoice(diceArray.length);
  secondPlayerDieIndex = GameEngine.getRandomComputerChoiceExcluding(diceArray.length, firstPlayerDieIndex);
} else {
  firstPlayerDieIndex = GameEngine.getRandomComputerChoice(diceArray.length);
  secondPlayerDieIndex = await GameEngine.promptUserDieChoiceExcluding(diceArray.length, firstPlayerDieIndex);
}

// Assign user and computer indices correctly depending on who chooses first
const userDieIndex = userChoosesFirst ? firstPlayerDieIndex : secondPlayerDieIndex;
const computerDieIndex = userChoosesFirst ? secondPlayerDieIndex : firstPlayerDieIndex;

console.log(`\n👤 You chose: Die ${userDieIndex + 1}`);
console.log(`💻 Computer chose: Die ${computerDieIndex + 1}`);


      // Step 5: Roll dice
      const userRoll = GameEngine.rollDie(diceArray[userDieIndex]);
      const computerRoll = GameEngine.rollDie(diceArray[computerDieIndex]);

      console.log(`\n🎯 Rolling the dice...`);
      console.log(`👤 You rolled: ${userRoll}`);
      console.log(`💻 Computer rolled: ${computerRoll}`);

      // Step 6: Determine winner
      if (userRoll > computerRoll) {
        console.log('\n🏆 You win!');
      } else if (userRoll < computerRoll) {
        console.log('\n💻 Computer wins!');
      } else {
        console.log('\n🤝 It\'s a draw!');
      }

      CliMenu.printEndMessage();
    } catch (err) {
      console.error('❌ Error:', err.message);
      process.exit(1);
    }
  }

  // FIX: Use inclusive upper bound in getRandomInt to avoid out-of-range index
  static rollDie(die) {
    const index = SecureRandomGenerator.getRandomInt(0, die.faces.length - 1);
    return die.faces[index];  
  }

  static getRandomComputerChoice(length) {
    // inclusive upper bound fix
    return SecureRandomGenerator.getRandomInt(0, length - 1);
  }

  static getRandomComputerChoiceExcluding(length, exclude) {
    let index;
    do {
      index = SecureRandomGenerator.getRandomInt(0, length - 1);
    } while (index === exclude);
    return index;
  }

  static promptUserDieChoice(length) {
    return GameEngine.promptNumber(
      `\nChoose your die (1–${length}): `,
      i => i >= 1 && i <= length,
      val => val - 1
    );
  }

  static promptUserDieChoiceExcluding(length, excludeIndex) {
    return GameEngine.promptNumber(
      `\nChoose your die (1–${length}, excluding ${excludeIndex + 1}): `,
      i => i >= 1 && i <= length && i !== excludeIndex + 1,
      val => val - 1
    );
  }

  static promptNumber(promptText, validator, mapper) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve => {
      const ask = () => {
        rl.question(promptText, input => {
          const num = parseInt(input.trim());
          if (validator(num)) {
            rl.close();
            resolve(mapper(num));
          } else {
            console.log('❌ Invalid choice. Try again.');
            ask();
          }
        });
      };
      ask();
    });
  }

  static waitForEnter(promptText = 'Press ENTER to continue...') {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve => rl.question(promptText, () => { rl.close(); resolve(); }));
  }
}
