// File: index.js

import { GameEngine } from './src/classes/GameEngine.js';

const diceInputs = process.argv.slice(2); // ✅ Declare diceInputs here

// ✅ Check for minimum 3 dice
if (diceInputs.length < 3) {
  console.error('❌ Error: At least 3 dice must be provided for the simulation.');
  console.error('Usage: node index.js <die1> <die2> <die3> [...moreDice]');
  process.exit(1);
}

// ✅ Check each die has exactly 6 numbers
for (let i = 0; i < diceInputs.length; i++) {
  const die = diceInputs[i].split(',').map(Number);

  if (die.length !== 6 || die.some(n => isNaN(n))) {
    console.error(`❌ Error: Die ${i + 1} must contain exactly 6 valid numbers.`);
    console.error('Each die must have exactly 6 numeric faces like: 1,2,3,4,5,6');
    process.exit(1);
  }
}
GameEngine.run(diceInputs);
