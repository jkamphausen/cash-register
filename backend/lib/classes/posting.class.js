// node_modules
import { format } from 'date-fns';
import uid from 'uid';

export default class Posting {
    constructor({ account, entryDate, amount, postingText, referenceText, oppositeParty }) {
        this._id = uid();
        this.account = account;
        this.entryDate = entryDate;
        this.amount = amount;
        this.postingText = postingText;
        this.referenceText = referenceText;
        this.oppositeParty = oppositeParty;
        this.allocations = [];
    }

    year() {
        return this.entryDate.getFullYear();
    }

    month() {
        return this.entryDate.getMonth();
    }

    readableDate() {
        return format(this.entryDate, 'MM.dd.yyyy');
    }

    csvString(separator = ';') {
        return `${this.readableDate()}${separator}${this.account}${separator}${this.referenceText}${separator}${this.oppositeParty}${separator}\n`;
    }

    allocate({ amount, pool, comment = undefined }) {
        if (this.amount > 0) { // posting is an incoming amount
            if (amount > this.amount || 0 >= amount) throw Error(`[Posting] Error: You tried to allocate ${amount} out of ${this.amount}.`);
            if ((this.sumUpAllocations() + amount) > this.amount) throw Error(`[Posting] Error: You tried to allocate ${this.sumUpAllocations() + amount} out of ${this.amount}.`);
        } else { // posting is an outgoing amount
            if (this.amount > amount || amount >= 0) throw Error(`[Posting] Error: You tried to allocate ${amount} out of ${this.amount}.`);
            if (this.amount > (this.sumUpAllocations() + amount)) throw Error(`[Posting] Error: You tried to allocate ${this.sumUpAllocations() + amount} out of ${this.amount}.`);
        }
        this.allocations.push({ _id: uid(), amount, pool, comment });
        return this;
    }

    sumUpAllocations() {
        return this.allocations.reduce((total, allocation) => {
            total += allocation.amount;
            return total;
        }, 0);
    }
}