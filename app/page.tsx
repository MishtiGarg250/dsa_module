import AddProblemForm from "@/components/add-problem-form";
import ProblemList from "@/components/problem-list";

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">
        DSA Tracker
      </h1>

      <AddProblemForm />

      <div className="mt-10">
        <ProblemList />
      </div>
    </main>
  );
}