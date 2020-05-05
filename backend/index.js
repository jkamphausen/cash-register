import { parseData } from './lib/parser';
import inspiration from 'inspirational-quotes';

const files = [
    '2015-108266.CSV',
    '2016-108266.CSV',
    '2017-108266.CSV',
    '2018-108266.CSV',
    '2019-108266.CSV',
];

parseData(files);

// const { author, text } = inspiration.getQuote();
// console.log(`${author} says: ${text}`);

//console.log('RUNNING!')
