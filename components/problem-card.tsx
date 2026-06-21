"use client";

import { useState } from "react";
import { SelectProblem } from "@/src/db/schema";
import ProblemStatus from "./problem-status";
import NotesEditor from "./notes-editor";

type Props = {
  problem: SelectProblem;
};

export default function ProblemCard({ problem }: Props) {
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  const getDifficultyColor = (diff: string | null) => {
    switch (diff?.toLowerCase()) {
      case 'easy': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'hard': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <>
      <tr className="hover:bg-muted/30 transition-colors group">
        <td className="px-6 py-4 align-middle">
          <ProblemStatus id={problem.id} status={problem.status} />
        </td>
        <td className="px-6 py-4 align-middle">
          <a href={problem.url} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary transition-colors hover:underline underline-offset-4 flex items-center gap-2">
            {problem.title}
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </td>
        <td className="px-6 py-4 align-middle">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-md border ${getDifficultyColor(problem.difficulty)}`}>
            {problem.difficulty || 'Unknown'}
          </span>
        </td>
        <td className="px-6 py-4 align-middle">
          <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border capitalize">
            {problem.platform}
          </span>
        </td>
        <td className="px-6 py-4 align-middle text-right">
          <button
            onClick={() => setIsNotesOpen(!isNotesOpen)}
            className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 ml-auto ${
              isNotesOpen ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isNotesOpen ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6"/></svg>
            Notes
          </button>
        </td>
      </tr>
      {isNotesOpen && (
        <tr className="bg-muted/10 border-b border-border/30">
          <td colSpan={5} className="px-6 py-4">
            <NotesEditor
              problemId={problem.id}
              initialNotes={problem.notes}
              onClose={() => setIsNotesOpen(false)}
            />
          </td>
        </tr>
      )}
    </>
  );
}