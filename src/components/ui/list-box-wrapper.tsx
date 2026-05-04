export function ListBoxWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="rounded-md border border-border shadow-sm">
            {children}
        </div>
    );
}
