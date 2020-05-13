// const esmImport = require('esm')(module);
// import calc from '../lib/calc';


// const MOCK_JOURNAL = [
//     {account: 'a', entryDate: new Date('2020-01-1'), amount: 1000 }, // +10
//     {account: 'a', entryDate: new Date('2020-01-2'), amount: 1000 }, // +10
//     {account: 'a', entryDate: new Date('2020-01-3'), amount: 1000 }, // +10
//     {account: 'a', entryDate: new Date('2020-01-4'), amount: -18999 }, // -189,99
//     {account: 'a', entryDate: new Date('2020-01-5'), amount: 100 }, // +10
//     {account: 'a', entryDate: new Date('2020-01-6'), amount: 27611 }, // +276,11
//     {account: 'a', entryDate: new Date('2020-01-7'), amount: 100 }, // +10
//     {account: 'a', entryDate: new Date('2020-01-8'), amount: 100 }, // +10
//     {account: 'a', entryDate: new Date('2020-01-9'), amount: 1499 }, // -14,99
//     {account: 'a', entryDate: new Date('2020-01-10'), amount: 100 }, // +10
// ]

// const INITIAL = 51734;

// const MOCK_RESULT = {
//     initial: INITIAL,
//     ins: 34611,
//     outs: -20498,
//     balance: 14113,
//     cumulative: 65847,
//     count: 13,
//     journal
// }

// // initial:                         517,34
// // ins: 7 ⋇ 10 + 276,11         =   346,11
// // outs: (-189,99) + (-14,99)   =   -204,98
// // balance: 346,11 + (-204,98)  =   141,13
// // cumulative: 517,34 + 141,13  =   658,47
// // count:                           13


// test('calculateResult', (MOCK_JOURNAL, MOCK_RESULT, INITIAL) => {
//     expect(calc.calculateResult(MOCK_JOURNAL, INITIAL)).toBe(MOCK_RESULT);
// });