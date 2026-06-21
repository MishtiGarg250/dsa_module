import { getProblems } from "@/actions/problem.action";
import ProblemCard from "./problem-card";

export default async function ProblemList() {
  const problems =
    await getProblems();

  return (
    <div className="space-y-4">
      {problems.map(
        (problem) => (
          <ProblemCard
            key={problem.id}
            problem={problem}
          />
        )
      )}
    </div>
  );
}