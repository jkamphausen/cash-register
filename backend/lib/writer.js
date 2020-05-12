// node_modules
import fs from 'fs';

// constants
const OUTPUT_PATH = '../output/';

export function writeCSV(journal, dry = false) {

    let csvContent = '';
    journal.postings.forEach(p => {
        console.log(p.csvString());
        csvContent += p.csvString();
    })

    if (!dry) {
        const filename = `journal_${new Date().getTime()}.xlsx`;

        fs.writeFile(OUTPUT_PATH + filename, csvContent, { encoding: 'UTF-16LE' }, function (err, data) {
            err ? console.log(err) : console.log(`[Writer] Export written to ${OUTPUT_PATH}${filename}!`);
            return;
        });
    } else {
        console.log(`[Writer] Dry run! No file export.`);
    }


}