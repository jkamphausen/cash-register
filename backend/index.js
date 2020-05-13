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
    //'2016-108266.CSV',
    //'2016-3657277.CSV',
    '2017-108266.CSV',
    //'2017-3657277.CSV',
    //'2018-108266.CSV',
    //'2019-108266.CSV',
];

// variables

function test(journal) {
    let { calculated: { ins, outs, transactions, balance, accounts, years, timespan, monthly } } = journal;
    console.log({ ins, outs, transactions, balance, accounts, years, timespan, monthly });
}

function testM(journal) {
    let { calculated: { ins, outs, transactions, balance, accounts, years, timespan, monthly } } = journal;
    console.log(monthly);
}

const journal = getJournalFromData(readMultipleDatasets(FILES));
//test(journal);

const journal2 = journal.getSubset(new Date(2017, 3, 1), new Date(2017, 7, 31));
//test(journal2);

const journal3 = journal.getSubset(new Date(2017, 0, 1), new Date(2017, 11, 31));
//test(journal3);
testM(journal3);


let sumMonthBalances = 0;
journal.calculated.monthly.forEach(m => {
    console.log(`${m.key}: ${m.calculated.balance}`);
    sumMonthBalances += m.calculated.balance;
});

console.log({ months: sumMonthBalances, journal: journal.calculated.balance })

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