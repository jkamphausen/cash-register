// let zu = 0;
// let ab = 0;
// let acc = 0;
// let count = 0;

// console.log(`${start} + ${zu} + ${ab} = ${start + zu + ab} (${end})`);
// console.log( (end === (start + zu + ab)) );


export function calculateResult(journal, initial){
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
        if(e.amount > 0) {
            result.ins = result.ins + e.amount;
        } else if (0 > e.amount) {
            result.outs = result.outs + e.amount;
        } else {
            console.error('mh … strange!');
            return;
        }
        result.balance = result.balance + e.amount;
        if(result.balance !== (result.ins + result.outs)) console.log('sth\'s terribly wrong!');
    });

    result.cumulative += result.balance;

    return result;
}