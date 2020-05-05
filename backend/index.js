import { parseData } from './lib/reader';

const options = {
    filenames: [
        '2015-108266.CSV',
        '2016-108266.CSV',
        '2017-108266.CSV',
        '2018-108266.CSV',
        '2019-108266.CSV',
    ],
    dry: true
}

parseData(options);



//console.log('RUNNING!')