import { useEffect, useState } from 'react';
import { JournalProvider } from './JournalContext';

// Copy from server → state needs to be declared in order to work even without data in place
const emptyState = {
    calculated: {
        ins: 0,
        outs: 0,
        balance: 0,
        transactions: {
            in: 0,
            out: 0,
            total: 0,
        },
        accounts: [],
        years: [],
        timespan: {
            first: null,
            last: null,
        },
        monthly: [],
    },
    postings: [],
}

// Custom Hook!
function useJournal() {
    const [journal, setJournal] = useState({ ...emptyState });
    useEffect(function () {
        (async () => {
            console.log('Mounting or Updating');
            const res = await fetch('http://localhost:1848/journal');
            const data = await res.json()
            setJournal(data);
        })()
    },
        []);
    return journal;
}

export default function Page({ children }) {
    const journal = useJournal();
    return (
        <JournalProvider value={{ journal }}>
            <div className="page">
                {children}
            </div>
        </JournalProvider>
    );
}