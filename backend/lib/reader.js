import csv from 'csv-parser';
import fs from 'fs';

import { formatJournalData } from './helpers';


const DATA_PATH = '../datasets/';

export function parseData({ filenames, dry = false}) {
    if(!Array.isArray(filenames)) return console.error('[Parser] filenames[] needs to be an array');
    filenames.forEach(file => {
        parseCSV(file);
    });
}

export function parseCSV(filename){
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

function processParsingResult(results){
    //console.log(results);
    const formatted = formatJournalData(results);
    console.log(formatted);
}



