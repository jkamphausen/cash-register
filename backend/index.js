import express from 'express';
import { parseData } from './lib/parser';
import inspiration from 'inspirational-quotes';

import db from './lib/db';

const files = [
    '2015-108266.CSV',
    // '2016-108266.CSV',
    // '2017-108266.CSV',
    // '2018-108266.CSV',
    // '2019-108266.CSV',
];

const app = express();

app.get(`/parse`, async (req, res, next) => {
    db.set('postsings', []).write()
    parseData(files);
    //res.json({ iCount, tCount });
});

app.get(`/calc`, () => {
    const postings = db.get('postings').value();
    const start = 111300;

    let calculation = start;
    console.log(calculation);
    postings.forEach((p, i) => {
        if (i < 10) console.log(`${calculation} += ${p.amountCents} = ${calculation + p.amountCents}`);
        calculation = parseInt(calculation) + parseInt(p.amountCents);
    });

    console.log(calculation);

});

app.listen(1850, () => {
    console.log(`Example App running on port http://localhost:1850`);
});





// const { author, text } = inspiration.getQuote();
// console.log(`${author} says: ${text}`);

//console.log('RUNNING!')
