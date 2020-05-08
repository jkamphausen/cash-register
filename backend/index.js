// node_modules
import fs from 'fs';
import express from 'express';
import inspiration from 'inspirational-quotes';

// ./lib
import { parseCentAmountInt, parseDateFromString } from './lib/helpers';
import { readDataset, readMultipleDatasets } from './lib/parser';
import { calculateResult } from './lib/calc';

// constants
const YEAR = 2017;
const YEAR1 = 2016;
const YEAR2 = 2016;

const FILES = [
    //'2015-108266.CSV',
    //'2016-108266.CSV',
    '2017-108266.CSV',
    //'2018-108266.CSV',
    //'2019-108266.CSV',
];


let journal = [];
//const data = readDataset(`${YEAR1}-108266.CSV`);

const data2 = readMultipleDatasets(FILES);

// console.log(data[1]);
// console.log(data2[1]);

data2.slice(1,-1).forEach((row, index) => {
    
    //console.log(removeQuotes(row[0]));
    const newEntry = {
        account: row[0],
        entryData: parseDateFromString(row[1]),
        amount: parseCentAmountInt(row[14])
    }
    journal.push(newEntry);
    // console.log(newEntry);
    if(index < 3) {
        //console.log(row);
        //console.log(row[0], row[1], row[3], parseCentAmountInt(row[14]) );
        //console.log(newEntry);
    } 
});




const CHECKS = {
    2015: {
        start: 0,
        end: 0,
    },
    2016: {
        start: 1113381,
        end: 190137,
    },
    2017: {
        start: 190137,
        end: 215113,
    },
    2018: {
        start: 215113,
        end: 335017,
    },
    2019: {
        start: 0,
        end: 0,
    },
};


const start = CHECKS[YEAR].start;
const end = CHECKS[YEAR].end;

const { initial, ins, outs, cumulative }  = calculateResult(journal, start);
console.log(`${initial} + ${ins} + ${outs} = ${cumulative} (${end})`);
console.log( (end === (cumulative)) );

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
