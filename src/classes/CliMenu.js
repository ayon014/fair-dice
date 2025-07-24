// File: src/classes/CliMenu.js

export class CliMenu {
    static printWelcomeMessage() {
        console.log('\n🎲 Welcome to the Provably Fair Non-Transitive Dice Simulator!');
        console.log('--------------------------------------------------------------\n');
    }

    static printUsageInstructions() {
        console.log('Usage: node index.js <die1> <die2> <die3> ...');
        console.log('Each die should be a comma-separated list of integers (e.g., "1,2,3,4,5,6")');
        console.log('Example: node index.js 1,2,3,4,5,6 1,1,2,2,3,3 1,1,1,2,2,2\n');
    }

    static printDiceSummary(diceArray) {
        console.log('\n🎯 Loaded Dice:');
        diceArray.forEach((die, index) => {
            console.log(`Die ${index + 1}: [${die.getAllFaces().join(', ')}]`);
        });
        console.log('');
    }

    static printEndMessage() {
        console.log('\nThanks for using the simulator. Goodbye!\n');
    }
}
