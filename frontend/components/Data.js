import { useContext } from 'react';
import { JournalContext } from './JournalContext';

export default function Data() {
    const { journal } = useContext(JournalContext);
    console.log(journal);

    return (
        <div>
            <h2>Data:</h2>

            {/* {journal.calculated.ins}
            {journal.calculated.outs} =
            {journal.calculated.balance}
            ({journal.calculated.ins + journal.calculated.outs}) */}
            <ul>
                {journal.postings.map(posting => <li key={posting._id}>
                    {posting.amount}
                </li>)}
            </ul>
        </div>
    )
}