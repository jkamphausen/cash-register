// node_modules
import fs from 'fs';
import express from 'express';
import inspiration from 'inspirational-quotes';

// ./lib
import { readMultipleDatasets, getJournalFromData } from './lib/parser';
import { writeCSV } from './lib/writer';
import { CHECKS } from './lib/checks';


// import { calculateResult, calculateMonthlyResults } from './lib/calcA';

// constants
const FILES = [
    //'2015-108266.CSV',
    '2016-108266.CSV',
    '2016-3657277.CSV',
    '2017-108266.CSV',
    '2017-3657277.CSV',
    //'2018-108266.CSV',
    //'2019-108266.CSV',
];

// variables

function test(journal) {
    let { ins, outs, transactions, balance, accounts, years, timespan } = journal;
    console.log({ ins, outs, transactions, balance, accounts, years, timespan });
}

const journal = getJournalFromData(readMultipleDatasets(FILES));
test(journal);

const journal2 = journal.getTimeFrame(new Date(2017, 3, 1), new Date(2017, 7, 31));
test(journal2);

/*
journal.postings[0]
    .allocate({ amount: -566, pool: 'a' })
    .allocate({ amount: -107, pool: 'b' })
    .allocate({ amount: -1660, pool: 'x' });
*/

/*
let { ins, outs, transactions, balance, accounts, years, timespan } = journal;
console.log({ ins, outs, transactions, balance, accounts, years, timespan });

*/