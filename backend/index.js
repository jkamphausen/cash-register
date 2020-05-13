// node_modules
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import inspiration from 'inspirational-quotes';

// ./lib
import { readMultipleDatasets, getJournalFromData } from './lib/parser';
import { writeCSV } from './lib/writer';
import { CHECKS } from './lib/checks';

// constants
const FILES = [
    //'2015-108266.CSV',
    '2016-108266.CSV',
    //'2016-3657277.CSV',
    '2017-108266.CSV',
    //'2017-3657277.CSV',
    '2018-108266.CSV',
    //'2019-108266.CSV',
];

// server

const app = express();
app.use(cors());

const port = 1848;

const journal = getJournalFromData(readMultipleDatasets(FILES));

app.get('/', function (req, res) {
    res.send('hello world')
})

app.get('/journal', function (req, res) {
    res.json(journal)
})

app.get('/journal/account/:accountId', function (req, res) {
    // const journal = getJournalFromData(readMultipleDatasets(FILES));
    // res.json(journal)
    res.json(journal.getSubsetByAccount(req.params.accountId));
    //res.send(`accountId: ${req.params.accountId}`);
})

app.get('/journal/interval', function (req, res) {
    // const journal = getJournalFromData(readMultipleDatasets(FILES));
    // res.json(journal)
    let startDate, endDate;
    if (req.query.start && req.query.end) {
        const start = req.query.start.split('-');
        const end = req.query.end.split('-');
        startDate = new Date(start[0], start[1], start[2]);
        endDate = new Date(end[0], end[1], end[2]);
    }
    res.json(journal.getSubsetByInterval(startDate, endDate));
    //res.send(`accountId: ${req.params.accountId}`);
})

app.listen(port, () => {
    console.log(`[cash-register] Server running on http://localhost:${port} 🚀`);
})