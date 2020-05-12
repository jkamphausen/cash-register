// node_modules
import _ from 'lodash';
import { isBefore, isAfter, isWithinInterval } from 'date-fns';

export default class Journal {

    constructor() {
        this.ins = 0;
        this.outs = 0;
        this.balance = 0;
        this.transactions = {
            in: 0,
            out: 0,
            total: 0,
        };
        this.accounts = [];
        this.years = [];
        this.timespan = {
            first: null,
            last: null,
        };
        this.postings = [];
    }

    addPosting(posting) {
        this.postings.push(posting)
        this.updateTotals();
        return this;
    }

    addPostings(postings) {
        postings.forEach(p => this.addPosting(p));
    }

    getPosting(id) {
        const p = this.postings.find((posting, index) => posting._id === id);
    }

    updateTotals(postings = this.postings) {
        const { ins, outs, balance, transactions, accounts, years, timespan } = postings.reduce(updateTotalsReducer,
            {
                ins: 0,
                outs: 0,
                balance: 0,
                transactions: {
                    in: 0,
                    out: 0,
                    total: 0,
                },
                accounts: [],
                years: [],
                timespan: {
                    first: null,
                    last: null,
                },
                postings: [],
            });
        this.ins = ins;
        this.outs = outs;
        this.balance = balance;
        this.transactions = transactions;
        this.accounts = accounts;
        this.years = years;
        this.timespan = timespan;
    }

    getTimeFrame(startDate = this.timespan.first, endDate = this.timespan.last) {
        const postings = this.postings.filter(p => isWithinInterval(p.entryDate, { start: startDate, end: endDate }));
        const subset = new Journal();
        subset.addPostings(postings.slice());
        return subset;
    }

}


function updateTotalsReducer(totals, posting) {
    const { account, entryDate, amount } = posting;
    const year = entryDate.getFullYear();

    // count transactions
    totals.transactions.total += 1;

    // add to ins or outs
    if (amount > 0) {
        totals.ins += amount;
        totals.transactions.in += 1;
    } else {
        totals.outs += amount;
        totals.transactions.out += 1;
    }

    // update balance
    totals.balance += amount;

    // add account if not already present
    totals.accounts.includes(account)
        ? null
        : totals.accounts.push(account);

    // add year if not already present
    totals.years.includes(year)
        ? null
        : totals.years.push(year);

    // check if posting extends timespan
    if (isBefore(entryDate, totals.timespan.first) || !totals.timespan.first) {
        totals.timespan.first = entryDate;
    }

    if (isAfter(entryDate, totals.timespan.last) || !totals.timespan.last) {
        totals.timespan.last = entryDate;
    }

    return totals;
}