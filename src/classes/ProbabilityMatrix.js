import { Die } from './Die.js';

export class ProbabilityMatrix {
    static calculateWinProbabilities(diceArray) {
        const matrix = [];
        for (let i = 0; i < diceArray.length; i++) {
            matrix[i] = [];
            for (let j = 0; j < diceArray.length; j++) {
                if (i === j) {
                    matrix[i][j] = 0.5;
                } else {
                    matrix[i][j] = ProbabilityMatrix.calculateWinProbability(diceArray[i], diceArray[j]);
                }
            }
        }
        return matrix;
    }

    static calculateWinProbability(dieA, dieB) {
        const facesA = dieA.getAllFaces();
        const facesB = dieB.getAllFaces();
        let wins = 0;
        for (const a of facesA) {
            for (const b of facesB) {
                if (a > b) wins++;
                else if (a === b) wins += 0.5;
            }
        }
        return wins / (facesA.length * facesB.length);
    }
}