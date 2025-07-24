// File: src/classes/TableRenderer.js

export class TableRenderer {
    static renderProbabilityMatrix(diceLabels, matrix) {
        const headers = ['Die', ...diceLabels];
        const rows = matrix.map((row, i) => [diceLabels[i], ...row.map(p => (p * 100).toFixed(1) + '%')]);

        const colWidths = headers.map((_, colIndex) =>
            Math.max(
                headers[colIndex].length,
                ...rows.map(row => row[colIndex].length)
            )
        );

        const formatRow = row =>
            row.map((cell, i) => cell.toString().padStart(colWidths[i])).join(' | ');

        const divider = colWidths.map(w => '-'.repeat(w)).join('-|-');

        const output = [
            formatRow(headers),
            divider,
            ...rows.map(formatRow)
        ].join('\n');

        console.log(output);
    }
}
