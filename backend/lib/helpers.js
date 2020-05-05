export function getDateFromString(dateString) {
    // dd.mm.yy
    const [day, month, year] = dateString.split('.');
    return new Date(`20${year}-${month}-${day}`);
}

export function formatJournalData(rawCSV) {

    /* raw csv:
    { 
        auftragskonto: 'account',
        buchungstag: '20.01.15',
        valutadatum: '20.01.15',
        buchungstext: 'posting text',
        verwendungszweck: 'reference text ',
        'glaeubiger id': 'creditor id text',
        mandatsreferenz: 'mandate ref text',
        'kundenreferenz (end-to-end)': 'customer reference text',
        sammlerreferenz: 'collector reference',
        'lastschrift ursprungsbetrag': 'original amount',
        'auslagenersatz ruecklastschrift': 'reimbursement',
        'beguenstigter/zahlungspflichtiger': 'opposite person name',
        'kontonummer/iban': 'iban',
        'bic (swift-code)': 'bic',
        betrag: '-64,90',
        waehrung: 'EUR',
        info: 'Umsatz gebucht' 
    } */

    const formatted = [...rawCSV];

    formatted.forEach(row => {

        // 1. set proper attributes 
        row.id = `i${Date.now()}`
        row.account = row.auftragskonto;
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
    });

    // 3. return the 
    return formatted;
}