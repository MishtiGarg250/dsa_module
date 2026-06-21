import AddProblemForm from "@/components/add-problem-form";
import ProblemList from "@/components/problem-list";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 w-full animate-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Problem Sheet
          </h1>
          <p className="text-muted-foreground mt-1">
            Track and manage your Data Structures and Algorithms progress.
          </p>
        </div>
        <div className="w-full md:w-auto">
          <AddProblemForm />
        </div>
      </div>

      <div className="glass rounded-xl overflow-hidden border border-border/50">
        <ProblemList />
      </div>
    </main>
  );
}
