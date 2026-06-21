import { getProblems } from "@/actions/problem.action";
import ProblemCard from "./problem-card";

export default async function ProblemList() {
  const problems = await getProblems();

  if (problems.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No problems tracked yet. Add one above to get started!
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-secondary/50 text-muted-foreground border-b border-border/50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium w-24">Status</th>
            <th scope="col" className="px-6 py-4 font-medium">Problem</th>
            <th scope="col" className="px-6 py-4 font-medium w-32">Difficulty</th>
            <th scope="col" className="px-6 py-4 font-medium w-32">Platform</th>
            <th scope="col" className="px-6 py-4 font-medium w-32 text-right">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/30">
          {problems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </tbody>
      </table>
    </div>
  );
}