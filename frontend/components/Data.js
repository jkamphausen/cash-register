import { useContext } from 'react';
import { JournalContext } from './JournalContext';

export default function Data() {
    const journalData = useContext(JournalContext);
    console.log(journalData);
    return (
        <div>
            <h2>Data:</h2>
            {journalData.hey}
        </div>
    )
}