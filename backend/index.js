// node_modules
import fs from 'fs';
import express from 'express';
import inspiration from 'inspirational-quotes';

// ./lib
import { parseCentAmountInt, parseDateFromString } from './lib/helpers';
import { readDataset, readMultipleDatasets } from './lib/parser';
import { calculateResult, calculateMonthlyResults } from './lib/calc';

// constants
const FILES = [
    //'2015-108266.CSV',
    '2016-108266.CSV',
    '2017-108266.CSV',
    //'2018-108266.CSV',
    //'2019-108266.CSV',
];

const CHECKS = {
    2015: {
        start: 111300,
        end: 1113381,
        balance: 1002081,
    },
    2016: {
        start: 1113381,
        end: 190137,
        balance: -923244,
    },
    2017: {
        start: 190137,
        end: 215113,
        balance: 24976,
    },
    2018: {
        start: 215113,
        end: 335017,
        balance: 119904,
    },
    2019: {
        start: 0,
        end: 0,
        balance: 0,
    },
};

// variables
let journal = [];

const data = readMultipleDatasets(FILES);

data.slice(1, -1).forEach((row, index) => {

    if (row[0] === 'Auftragskonto') {
        // console.log(`skipping header row: «${row}»`)
        return;
    }
    if (row[0] === '') {
        // console.log(`skipping EOF row: «${row}»`)
        return;
    }
    //console.log(removeQuotes(row[0]));
    const newEntry = {
        account: row[0],
        entryDate: parseDateFromString(row[1]),
        amount: parseCentAmountInt(row[14])
    }

    if (newEntry.entryDate === null || newEntry.amount === null) console.log(newEntry);

    journal.push(newEntry);
    // console.log(newEntry);
    if (index < 3) {
        //console.log(row);
        //console.log(row[0], row[1], row[3], parseCentAmountInt(row[14]) );
        //console.log(newEntry);
    }
});

const start = CHECKS[2015].start;
const end = CHECKS[2015].end;

const { initial, ins, outs, cumulative } = calculateResult(journal, start);
console.log(`${initial} + ${ins} + ${outs} = ${cumulative} (${end}) | ${journal.length}`);
console.log((end === cumulative));
if (end !== cumulative) {
    console.log(`CHECK: ${end} | RESULT: ${cumulative} | CHECK - RESULT: ${end - cumulative}`);
}


calculateMonthlyResults(journal, start);







// const start = CHECKS[YEAR1].start;
// const end = CHECKS[YEAR2].end;

// let zu = 0;
// let ab = 0;
// let acc = 0;
// let count = 0;
// journal.forEach(e => {
//     count++;
//     //console.info(`${count}: ${e.amount}`);
//     if(e.amount > 0) {
//         zu = zu + e.amount;
//     } else if (0 > e.amount) {
//         ab = ab + e.amount;
//     } else {
//         console.error('mh … strange!');
//         return;
//     }
// });
// console.log(`${start} + ${zu} + ${ab} = ${start + zu + ab} (${end})`);
// console.log( (end === (start + zu + ab)) );




// const app = express();

// app.get(`/parse`, async (req, res, next) => {
//     db.set('postsings', []).write()
//     parseData(files);
//     //res.json({ iCount, tCount });
// });

// app.get(`/calc`, () => {
//     const postings = db.get('postings').value();
//     const start = 111300;

//     let calculation = start;
//     console.log(calculation);
//     postings.forEach((p, i) => {
//         if (i < 10) console.log(`${calculation} += ${p.amountCents} = ${calculation + p.amountCents}`);
//         calculation = parseInt(calculation) + parseInt(p.amountCents);
//     });

//     console.log(calculation);

// });

// app.listen(1850, () => {
//     console.log(`Example App running on port http://localhost:1850`);
// });





// const { author, text } = inspiration.getQuote();
// console.log(`${author} says: ${text}`);

//console.log('RUNNING!')
