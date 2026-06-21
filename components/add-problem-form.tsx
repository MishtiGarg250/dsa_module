"use client";
import { useState } from "react";
import { addProblem } from "@/actions/problem.action";

export default function AddProblemForm() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    
    try {
      setLoading(true);
      setErrorMsg("");
      await addProblem(url);
      setUrl("");
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || "Failed to add problem");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col w-full max-w-sm">
      <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
        <div className="relative flex-1">
          <input
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setErrorMsg("");
            }}
            placeholder="Paste LeetCode URL..."
            className={`w-full bg-secondary/50 border ${errorMsg ? "border-destructive/50 focus:ring-destructive/50" : "border-border focus:ring-primary/50"} rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all`}
          />
        </div>

        <button
          disabled={loading || !url.trim()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </>
          )}
        </button>
      </form>
      {errorMsg && (
        <p className="text-xs text-destructive mt-2 ml-1 animate-in fade-in slide-in-from-top-1">
          {errorMsg}
        </p>
      )}
    </div>
  );
}