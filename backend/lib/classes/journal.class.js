// node_modules
import _ from 'lodash';
import { isBefore, isAfter, isWithinInterval } from 'date-fns';
import { toHumanReadableMonth, toComputerReadableMonth } from '../helpers';

// ./lib
import Month from './month.class';

const EMPTY = {
    calculated: {
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
        monthly: [],
    },
    postings: [],
}

export default class Journal {

    constructor() {
        const { calculated, postings, monthly } = _.cloneDeep(EMPTY);
        this.calculated = calculated;
        // this.calculated.ins = ins;
        // this.calculated.outs = outs;
        // this.calculated.balance = balance;
        // this.calculated.transactions = transactions;
        // this.calculated.accounts = accounts;
        // this.calculated.years = years;
        // this.calculated.timespan = timespan;
        this.postings = postings;
        this.monthly = monthly;
    }

    // add a new Posting to this journal 
    addPosting(posting) {
        this.postings.push(posting)
        this.updateTotals();
        return this;
    }

    // add multiple Postings in a row → just loopin' over the array & callin' addPosting!
    addPostings(postings) {
        postings.forEach(p => this.addPosting(p));
    }

    // get a Posting from this journal by its id
    getPosting(id) {
        return this.postings.find((posting, index) => posting._id === id);
    }

    // update the calculated values of the journal after changing the Postings
    updateTotals(postings = this.postings) {
        const { ins, outs, balance, transactions, accounts, years, timespan, monthly } = postings.reduce(updateTotalsReducer,
            _.cloneDeep(EMPTY.calculated));
        this.calculated.ins = ins;
        this.calculated.outs = outs;
        this.calculated.balance = balance;
        this.calculated.transactions = transactions;
        this.calculated.accounts = accounts;
        this.calculated.years = years;
        this.calculated.timespan = timespan;
        this.calculated.monthly = monthly;
    }

    // extract a subset of this journal by an interval of dates
    getSubset(startDate = this.calculated.timespan.first, endDate = this.calculated.timespan.last) {
        const postings = this.postings.filter(p => isWithinInterval(p.entryDate, { start: startDate, end: endDate }));
        const subset = new Journal();
        subset.addPostings(postings.slice());
        return subset;
    }
}

// reducer to recalculate all synthetic values of this journal
function updateTotalsReducer(totals, posting) {
    const { account, entryDate, amount } = posting;
    const year = entryDate.getFullYear();
    const month = toHumanReadableMonth(entryDate.getMonth());
    const monthOfYear = `${month}/${year}`;

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

    // add Posting to Month & add Month if not already present
    if (totals.monthly.find(m => m.key === monthOfYear)) {
        totals.monthly.find(m => m.key === monthOfYear).addPosting(posting);
    } else {
        const newMonth = new Month(monthOfYear, toComputerReadableMonth(month));
        newMonth.addPosting(posting);
        totals.monthly.push(newMonth);
    }

    return totals;
}

