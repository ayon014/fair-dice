// File: src/classes/DiceParser.js

import { Die } from './Die.js';

export class DiceParser {
    static parse(inputArgs) {
        if (!Array.isArray(inputArgs) || inputArgs.length === 0) {
            throw new Error("No dice provided. Please provide dice as command-line arguments.");
        }

        return inputArgs.map(arg => {
            // Ensure arg is a string before splitting
            const diceStr = String(arg);
            const faces = diceStr.split(',').map(num => {
                const parsed = Number(num);
                if (isNaN(parsed)) {
                    throw new Error(`Invalid face value "${num}" in input: "${arg}"`);
                }
                return parsed;
            });

            return new Die(faces);
        });
    }
}
