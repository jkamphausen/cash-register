import csv from 'csv-parser';
import fs from 'fs';

import { formatJournalData } from './helpers';

const DATA_PATH = '../datasets/';

export function parseData(files) {
    // 1. check if files is an array
    if (!Array.isArray(files)) return console.error('[Parser] files[] needs to be an array');

    // 2. parse all files
    files.forEach(file => {
        parseCSV(file);
    });
}

export function parseCSV(filename) {
    const results = [];
    fs.createReadStream(DATA_PATH + filename)
        .pipe(csv({
            separator: ';',
            mapHeaders: ({ header, index }) => header.toLowerCase()
        }))
        .on('data', (data) => results.push(data))
        .on('end', () => {
            processParsingResult(results);
        });
}

function processParsingResult(results) {
    //console.log(results);
    const formatted = formatJournalData(results);
    //console.info(`[Parser] ${formatted.length} entries extracted from file.`);

    console.log(formatted[0].amount);

}


