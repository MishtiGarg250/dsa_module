"use client";
import { startTransition, useTransition } from "react";
import { toggleProblemStatus } from "@/actions/problem.action";

interface Props {
  id: string;
  status: string;
}

export default function ProblemStatus({ id, status }: Props) {
  const [pending, setPending] = useTransition();
  const isSolved = status === "solved";

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          await toggleProblemStatus(id, status);
        });
      }}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
        isSolved ? "bg-primary" : "bg-muted"
      }`}
      role="switch"
      aria-checked={isSolved}
    >
      <span className="sr-only">Toggle status</span>
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          isSolved ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}