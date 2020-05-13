// node_modules
import fs from 'fs';

// ./lib
import { parseCentAmountInt, parseDateFromString } from './helpers';
import Journal from './classes/journal.class';
import Posting from './classes/posting.class';

// constants
const DATA_PATH = '../datasets/';




export function readMultipleDatasets(filenames = []) {
    let totalData = [];
    filenames.forEach(file => {
        totalData = [...totalData, ...readDataset(file)];
        //console.log(readDataset(file)[0])
    })
    return totalData;
}

export function readDataset(filename) {
    return fs.readFileSync(DATA_PATH + filename, { encoding: 'utf8' })
        .toString() // convert Buffer to string
        .split('\n') // split string to lines
        .map(e => e.trim()) // remove white spaces for each line
        .map(e => e.split(';').map(e => e.trim())) // split each line to array
        .map(e => e.map(f => f.slice(1, -1)))
        ;

    // console.info(`Read ${data.length} lines`);
}


export function getJournalFromData(data) {
    let journal = new Journal();

    data.slice(1, -1).forEach((row, index) => {

        if (row[0] === 'Auftragskonto') { // console.log(`skipping header row: «${row}»`)
            return;
        }
        if (row[0] === '') { // console.log(`skipping EOF row: «${row}»`)
            return;
        }
        //console.log(removeQuotes(row[0]));
        const posting = new Posting({
            account: row[0],
            entryDate: parseDateFromString(row[1]),
            amount: parseCentAmountInt(row[14]),
            postingText: row[3],
            referenceText: row[4],
            oppositeParty: row[11],
        });

        if (posting.entryDate === null || posting.amount === null) console.log(posting);

        journal.addPosting(posting);
    });

    return journal;
}