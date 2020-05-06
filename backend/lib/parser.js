import csv from 'csv-parser';
import fs from 'fs';

import Posting from './posting.class';

import { storeToDB } from './helpers';

const DATA_PATH = '../datasets/';


export function parseData(files) {
    // 1. check if files is an array
    if (!Array.isArray(files)) return console.error('[Parser] files[] needs to be an array');

    // 2. get all csv files
    const csvFiles = files.filter(file => file.slice(file.length - 4).toLowerCase() === '.csv')
    // console.log(csvFiles);

    // 3. parse all csv files
    csvFiles.forEach(file => {
        readToDB(file);
    });
}

async function readToDB(filename) {
    if (filename.slice(filename.length - 4).toLowerCase() !== '.csv') return console.error(`${filename} is not a .csv!`);

    let results = [];
    fs.createReadStream(DATA_PATH + filename)
        .pipe(csv({
            separator: ';',
            mapHeaders: ({ header, index }) => header.toLowerCase()
        }))
        .on('data', (data) => results.push(data))
        .on('end', () => {
            storeToDB(results);
        });
}


