

export function parseCentAmountInt(string) {
    if(!string) {
        console.log('WHAAAAT?');
        return null;
    }
    return parseInt(string.replace(',', ''));
}

export function parseDateFromString(dateString) {
    // dd.mm.yy
    if(!dateString) {
        console.log('WHAAAAT?');
        return null;
    }
    const [day, month, year] = dateString.split('.');
    return new Date(`20${year}-${month}-${day}`);
}








/*
export function storeToDB(rawCSV) {

    let postings = [];
    // raw csv:
    // { 
    //     auftragskonto: 'account',
    //     buchungstag: '20.01.15',
    //     valutadatum: '20.01.15',
    //     buchungstext: 'posting text',
    //     verwendungszweck: 'reference text ',
    //     'glaeubiger id': 'creditor id text',
    //     mandatsreferenz: 'mandate ref text',
    //     'kundenreferenz (end-to-end)': 'customer reference text',
    //     sammlerreferenz: 'collector reference',
    //     'lastschrift ursprungsbetrag': 'original amount',
    //     'auslagenersatz ruecklastschrift': 'reimbursement',
    //     'beguenstigter/zahlungspflichtiger': 'opposite person name',
    //     'kontonummer/iban': 'iban',
    //     'bic (swift-code)': 'bic',
    //     betrag: '-64,90',
    //     waehrung: 'EUR',
    //     info: 'Umsatz gebucht' 
    // }

    const formatted = [...rawCSV];

    formatted.forEach(row => {

        // 1. set proper attributes 
        row.account = row.auftragskonto;
        row.refDateString = row.buchungstag;
        row.entryDate = getDateFromString(row.buchungstag);
        row.valueDate = getDateFromString(row.valutadatum);
        row.postingText = row.buchungstext;
        row.referenceText = row.verwendungszweck;
        row.creditorId = row['glaeubiger id'];
        row.mandateRef = row.mandatsreferenz;
        row.customerRef = row['kundenreferenz (end-to-end)'];
        row.collectorRef = row.sammlerreferenz;
        row.originalAmount = row['lastschrift ursprungsbetrag'];
        row.reimbursement = row['auslagenersatz ruecklastschrift'];
        row.oppositePerson = row['beguenstigter/zahlungspflichtiger'];
        row.iban = row['kontonummer/iban'];
        row.bic = row['bic (swift-code)'];
        row.amount = row.betrag;
        row.amountCents = parseInt(centifyAmount(row.betrag));
        row.currency = row.waehrung;
        //keep row.info !

        // 2. delete crappy stuff
        delete row.auftragskonto;
        delete row.buchungstag;
        delete row.valutadatum;
        delete row.buchungstext;
        delete row.verwendungszweck;
        delete row['glaeubiger id'];
        delete row.mandatsreferenz;
        delete row['kundenreferenz (end-to-end)'];
        delete row.sammlerreferenz;
        delete row['lastschrift ursprungsbetrag'];
        delete row['auslagenersatz ruecklastschrift'];
        delete row['beguenstigter/zahlungspflichtiger'];
        delete row['kontonummer/iban'];
        delete row['bic (swift-code)'];
        delete row.betrag;
        delete row.waehrung;

        const posting = Object.assign(new Posting, row);

        postings.push(posting);
    });

    db.get('postings')
        .push(...postings)
        .write();

    // const read = db.get('postings').value();
    console.log(postings);

    // // 3. return as Postings
    return postings;
}
*/

/*
// old
function centifyAmount(val) {
    const num = val.split(`,`);
    if (!num[1]) {
        num[1] = '00';
    } else if (num[1].length === 1) {
        num[1] += '0'
    }
    const res = num[0] + num[1];
    return res;
}
*/