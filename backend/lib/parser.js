// node_modules
import fs from 'fs';

// constants
const DATA_PATH = '../datasets/';

export function readMultipleDatasets(filenames = []){
    let totalData = [];
    filenames.forEach(file => {
        totalData = [...totalData, ...readDataset(file)];
        //console.log(readDataset(file)[0])
    })
    return totalData;
}

export function readDataset(filename){
    return fs.readFileSync(DATA_PATH + filename)
    .toString() // convert Buffer to string
    .split('\n') // split string to lines
    .map(e => e.trim()) // remove white spaces for each line
    .map(e => e.split(';').map(e => e.trim())) // split each line to array
    .map(e => e.map(f => f.slice(1,-1)))
    ;

    // console.info(`Read ${data.length} lines`);
}