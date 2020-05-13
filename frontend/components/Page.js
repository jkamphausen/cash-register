import { JournalProvider } from './JournalContext';

export default function Page({ children }) {
    return (
        <JournalProvider value={{ hey: 'ho', lets: 'go' }}>
            <div className="page">
                {children}
            </div>
        </JournalProvider>
    );
}