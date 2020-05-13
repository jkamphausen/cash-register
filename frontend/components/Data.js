import { useContext } from 'react';
import { JournalContext } from './JournalContext';
import Chart from './Chart';

export default function Data() {
    const { journal } = useContext(JournalContext);
    const display = journal.calculated.monthly.map(m => {
        const ins = m.calculated.ins / 100;
        const outs = m.calculated.outs / 100;
        const balance = m.calculated.balance / 100;
        const key = m.key
        return {
            ins,
            outs,
            balance,
            key,
        }
    })
    console.log(journal);

    return (
        <div>
            <h2>Data:</h2>

            {/* {journal.calculated.ins}
            {journal.calculated.outs} =
            {journal.calculated.balance}
            ({journal.calculated.ins + journal.calculated.outs}) */}

            <Chart data={display} />

            {/*
            <table>
                <thead>
                    <tr>
                        <td>Richtung</td>
                        <td>Datum</td>
                        <td>Konto</td>
                        <td>Betrag</td>
                        <td>Empfänger / Zahler</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        journal.postings.map(posting =>
                            <tr key={posting._id}>
                                <td>{
                                    posting.amount > 0 ? '📈' : '📉'
                                }</td>
                                <td>{new Date(posting.entryDate).toDateString()}</td>
                                <td>{posting.account}</td>
                                <td>{posting.amount}ct</td>
                                <td>{posting.oppositeParty}</td>
                            </tr>)
                    }
                    <tr>
                        <td>{
                            journal.calculated.balance > 0 ? '📈' : '📉'
                        }</td>
                        <td>-</td>
                        <td>-</td>
                        <td>{journal.calculated.balance}ct</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
                    */}

        </div>
    )
}