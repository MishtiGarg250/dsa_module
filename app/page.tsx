import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const { userId } = await auth();

  // If already logged in, you might want to direct them to the dashboard
  // Or just let them see the landing page with a "Go to Dashboard" button.
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4 py-20 relative overflow-hidden">
      <div className="space-y-6 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/70 pb-2">
          Master Your <span className="text-primary">Algorithms</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          The ultimate spreadsheet to track your LeetCode progress, organize your thoughts, and conquer your next technical interview.
        </p>
        
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/sign-up"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-medium px-8 py-4 rounded-full transition-all active:scale-95 w-full sm:w-auto"
          >
            Start Tracking for Free
          </Link>
          <Link
            href="/sign-in"
            className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border text-lg font-medium px-8 py-4 rounded-full transition-all active:scale-95 w-full sm:w-auto"
          >
            Log In
          </Link>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl w-full text-left animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
        <div className="glass p-6 rounded-2xl">
          <div className="bg-primary/20 text-primary w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Automated Parsing</h3>
          <p className="text-muted-foreground text-sm">Paste a LeetCode URL and we instantly grab the title, difficulty, and platform details.</p>
        </div>
        <div className="glass p-6 rounded-2xl">
          <div className="bg-primary/20 text-primary w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Rich Notes</h3>
          <p className="text-muted-foreground text-sm">Write down your approach, time complexity, and "aha" moments directly inline.</p>
        </div>
        <div className="glass p-6 rounded-2xl">
          <div className="bg-primary/20 text-primary w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Status Tracking</h3>
          <p className="text-muted-foreground text-sm">Keep a clean, spreadsheet-like view of what you've solved and what you need to review.</p>
        </div>
      </div>
    </main>
  );
}