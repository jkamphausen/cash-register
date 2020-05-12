import uid from 'uid';

export default class Posting {
    constructor(
        account,
        entryDate,
        valueDate,
        postingText,
        referenceText,
        creditorId,
        mandateRef,
        customerRef,
        collectorRef,
        originalAmount,
        reimbursement,
        oppositePerson,
        iban,
        bic,
        amount,
        amountCents,
        currency) {
        this._id = uid(16);
        this.account = account;
        this.entryDate = entryDate;
        this.valueDate = valueDate;
        this.postingText = postingText;
        this.referenceText = referenceText;
        this.creditorId = creditorId;
        this.mandateRef = mandateRef;
        this.customerRef = customerRef
        this.collectorRef = collectorRef;
        this.originalAmount = originalAmount;
        this.reimbursement = reimbursement;
        this.oppositePerson = oppositePerson;
        this.iban = iban;
        this.bic = bic;
        this.amount = amount;
        this.amountCents = amountCents;
        this.currency = currency;
    }
}