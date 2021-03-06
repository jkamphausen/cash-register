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

const JOURNAL_BY_MONTH = {
    year: 2015,
    first: null,
    last: null,
    months: [
        {
            name: 'jan',
            ins: 0,
            outs: 0,
            balance: 0,
            postings: []
        },
        // ...
    ]
}

export function calculateMonthlyResults(journal, initial) {
    const monthlyJournal = journal
        .reduce(divideByAccounts, [])
        .reduce(subdivideByYears, []);

    console.log(monthlyJournal);
    return monthlyJournal;
}


function divideByAccounts(dividedJournal, posting) {
    const { account, amount } = posting;
    let affectedAccount = dividedJournal.find(acc => acc.account === account);

    let incoming = 0,
        outgoing = 0;

    amount >= 0
        ? incoming = amount
        : outgoing = amount;

    if (affectedAccount) { // account posting belongs to exists?
        affectedAccount = {
            ins: affectedAccount.ins += incoming,
            out: affectedAccount.out += outgoing,
            balance: affectedAccount.balance += amount,
            transactions: affectedAccount.transactions += 1,
            postings: affectedAccount.postings.push(posting),
            ...affectedAccount,
        }

    } else { // account posting belongs to doesn't exist
        dividedJournal.push({
            account,
            ins: incoming,
            out: outgoing,
            balance: amount,
            transactions: 1,
            postings: [posting]
        });
    }

    return dividedJournal;
}


function subdivideByYears(dividedAccount, account) {
    const { postings } = account;
    account.years = [];
    postings.forEach(posting => {

        const year = posting.entryDate.getFullYear();
        const { amount } = posting;

        if (!dividedAccount.years) dividedAccount.years = [];
        let affectedYear = dividedAccount.years.find(y => y.year === year);

        let incoming = 0,
            outgoing = 0;

        amount >= 0
            ? incoming = amount
            : outgoing = amount;

        if (affectedYear) { // year posting belongs in exists?
            affectedYear = {
                ins: affectedYear.ins += incoming,
                out: affectedYear.out += outgoing,
                balance: affectedYear.balance += amount,
                transactions: affectedYear.transactions += 1,
                postings: affectedYear.postings.push(posting),
                ...affectedYear,
            }

        } else { // year posting belongs in doesn't exist
            dividedAccount.years.push({
                year,
                ins: incoming,
                out: outgoing,
                balance: amount,
                transactions: 1,
                postings: [posting]
            });
        }

    });

    return dividedAccount;
}




const divideJournal = (dividedJournal, posting) => {
    const year = posting.entryDate.getFullYear();
    const month = getMonthNameShort(posting.entryDate);

    // get the year the posting belongs to
    let affectedYear = dividedJournal.find(y => y.year === year);
    //console.log(affectedYear);

    if (affectedYear) { // year exists already
        const { months } = affectedYear;

        // affectedYear[month] ? affectedYear[month].push(posting) : affectedYear[month] = [posting]
        if (months) { // .months exists?
            const affectedMonth = months.find(m => m.name === month);
            affectedMonth // is the affected month in the .months array?
                ? affectedMonth.postings.push(posting) // yes → push the posting in
                : months.push({ name: month, postings: [posting] }) // no → 
        } else {
            months.postings.push(posting);
        }
    } else { // year doesn't exist
        //dividedJournal.push({ year, [month]: [posting] })
        dividedJournal.push({ year, months: [{ name: month, postings: [posting] }] })
        affectedYear = dividedJournal.find(y => y.year === year);
    }

    affectedYear.balance ? affectedYear.balance += posting.amount : affectedYear.balance = posting.amount;

    return dividedJournal;
}





function getMonthNameShort(date) {
    const monthNamesShort = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    return monthNamesShort[date.getMonth()];
}