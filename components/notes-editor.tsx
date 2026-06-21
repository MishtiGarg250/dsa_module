"use client";

import { useState, useTransition } from "react";
import { updateProblemNotes } from "@/actions/problem.action";

interface Props {
  problemId: string;
  initialNotes: string | null;
  onClose?: () => void;
}

export default function NotesEditor({ problemId, initialNotes, onClose }: Props) {
  const [notes, setNotes] = useState(initialNotes || "");
  const [isPending, startTransition] = useTransition();

  function saveNotes() {
    startTransition(async () => {
      await updateProblemNotes(problemId, notes);
      if (onClose) onClose();
    });
  }

  const isChanged = notes !== (initialNotes || "");

  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="relative group">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full bg-secondary/30 border border-border/50 rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all resize-y min-h-[80px]"
          placeholder="Add your thoughts, approach, or notes here..."
        />
      </div>
      <div className="flex justify-end gap-2">
        {onClose && (
          <button
            onClick={() => {
              setNotes(initialNotes || "");
              onClose();
            }}
            className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          onClick={saveNotes}
          disabled={isPending || !isChanged}
          className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border px-4 py-1.5 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isPending ? (
            <>
              <svg className="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            "Save Notes"
          )}
        </button>
      </div>
    </div>
  );
}