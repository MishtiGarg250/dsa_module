"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("An error occurred in a Server Component:", error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-300">
      <div className="glass p-8 rounded-2xl max-w-md w-full relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-destructive/50" />
        <div className="bg-destructive/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-destructive">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
        <h2 className="text-2xl font-bold mb-3 text-foreground tracking-tight">Something went wrong</h2>
        <p className="text-muted-foreground mb-8 text-sm">
          We encountered an unexpected error while loading this page. This might be due to a database connection issue or an invalid request.
        </p>
        <button
          onClick={() => reset()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-6 rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95 w-full"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
