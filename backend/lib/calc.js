//import { sectionJournalMonthly } from './helpers';

export function calculateResult(journal, initial) {
    // set up the result object
    let result = {
        initial,
        ins: 0,
        outs: 0,
        balance: 0,
        cumulative: initial,
        count: 0,
        journal
    }

    journal.forEach(e => {
        result.count++;
        //console.info(`${count}: ${e.amount}`);
        if (e.amount > 0) {
            result.ins = result.ins + e.amount;
        } else if (0 > e.amount) {
            result.outs = result.outs + e.amount;
        } else {
            console.error('mh … strange!');
            return;
        }
        result.balance = result.balance + e.amount;
        if (result.balance !== (result.ins + result.outs)) console.log('sth\'s terribly wrong!');
    });

    result.cumulative += result.balance;

    return result;
}

const JOURNAL_BY_MONTH = { year: 2015, first: null, last: null, jan: [], feb: [], mar: [], }

export function calculateMonthlyResults(journal, initial) {
    const monthlyJournal = journal.reduce(divideJournal, []);

    console.log(monthlyJournal);
    return monthlyJournal;
}

const divideJournal = (dividedJournal, posting) => {
    const year = posting.entryDate.getFullYear();
    const month = getMonthNameShort(posting.entryDate);

    //console.log(dividedJournal.find(y => y == { year }));

    // dividedJournal.find(y => y.year === year) ? dividedJournal.find(y => y.year === year).postings = [posting] : dividedJournal.push({ year, postings: [posting] });

    const affectedYear = dividedJournal.find(y => y.year === year);

    if (affectedYear) {
        affectedYear[month] ? affectedYear[month].push(posting) : affectedYear[month] = [posting]
        //dividedJournal.find(y => y.year === year).postings = [posting]
    } else {
        dividedJournal.push({ year, [month]: [posting] })
    }

    return dividedJournal;
}

function getMonthNameShort(date) {
    const monthNamesShort = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    return monthNamesShort[date.getMonth()];
}