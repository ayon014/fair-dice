# Provably Fair Non-Transitive Dice Simulator

This project is a command-line application that simulates a generalized non-transitive dice game with provably fair random number generation and cryptographic proof of fairness. The game supports any number of dice with arbitrary faces, calculates the probability matrix of dice winning against each other, and uses cryptographic commitments (HMAC with SHA3-256) to prove that the computer does not cheat when deciding who moves first and rolling dice.

## Features

- Accepts 3 or more dice configurations as command-line arguments (each die is specified as comma-separated integers).
- Calculates and displays a probability matrix showing each die’s chance of beating others.
- Implements a provably fair protocol for deciding who chooses first, using cryptographic HMAC commitments.
- Both user and computer select dice and roll them fairly.
- Clear CLI menus and prompts.
- ASCII-art probability table rendering.

## Requirements

- Node.js
