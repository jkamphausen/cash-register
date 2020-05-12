const YEAR = {
    year: undefined,
    month: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        11: [],
    }
}

export function parseCentAmountInt(string) {
    if (!string) {
        console.log(`${string} can not be pared to cent amount!`);
        return undefined;
    }
    return parseInt(string.replace(',', ''));
}

export function parseDateFromString(dateString) {
    // dd.mm.yy
    if (!dateString) {
        console.log(`${dateString} can not be pared to Date()!`);
        return undefined;
    }
    const [day, month, year] = dateString.split('.');
    return new Date(`20${year}-${month}-${day}`);
}