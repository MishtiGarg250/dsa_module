import { SelectProblem } from "@/src/db/schema";

type Props = {
  problem: SelectProblem;
};

export default function ProblemCard({
  problem,
}: Props) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">
          {problem.title}
        </h3>

        <span>
          {
            problem.difficulty
          }
        </span>
      </div>

      <div className="text-sm text-muted-foreground">
        {problem.platform}
      </div>

      <a
        href={problem.url}
        target="_blank"
        className="text-blue-500"
      >
        Open Problem
      </a>
    </div>
  );
}