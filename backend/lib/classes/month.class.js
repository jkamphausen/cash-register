// node_modules
import _ from 'lodash';
import uid from 'uid';

// ./lib

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
    },
    postings: [],
}

export default class Month {
    constructor(key, month) {
        const { calculated, postings } = _.cloneDeep(EMPTY);
        this._id = uid();
        this.month = month;
        this.key = key;
        this.calculated = calculated;
        this.postings = postings;
    }

    // add a new Posting to this month 
    addPosting(posting) {
        this.postings.push(posting)
        this.updateCalculations();
        return this;
    }

    // update the calculated values of the journal after changing the Postings
    updateCalculations(postings = this.postings) {
        const { ins, outs, balance, transactions, accounts } = postings.reduce(updateCalculationsReducer,
            _.cloneDeep(EMPTY.calculated));
        this.calculated.ins = ins;
        this.calculated.outs = outs;
        this.calculated.balance = balance;
        this.calculated.transactions = transactions;
        this.calculated.accounts = accounts;
    }
}

// reducer to recalculate all synthetic values of this journal
function updateCalculationsReducer(totals, posting) {
    const { account, entryDate, amount } = posting;

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

    return totals;
}