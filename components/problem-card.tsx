import { SelectProblem } from "@/src/db/schema";
import ProblemStatus from "./problem-status";
import NotesEditor from "./notes-editor";


type Props = {
  problem: SelectProblem;
};

export default function ProblemCard({
  problem,
}: Props) {
  return (
    <div className="border rounded-lg p-4 space-y-4">

      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">
            {problem.title}
          </h3>

          <p>
            {problem.platform}
          </p>

          <p>
            {problem.difficulty}
          </p>
        </div>

        <ProblemStatus
          id={problem.id}
          status={problem.status}
        />
      </div>

      <a
        href={problem.url}
        target="_blank"
      >
        Open Problem
      </a>

      <NotesEditor
        problemId={problem.id}
        initialNotes={problem.notes}
      />
    </div>
  );
}