import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider, Show, SignUpButton, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "DSA Tracker - Master Your Algorithms",
  description: "A premium platform to track your Data Structures and Algorithms progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        <ClerkProvider>
          <header className="flex justify-between items-center p-4 h-16 border-b border-white/5 glass sticky top-0 z-50">
            <Link href="/" className="font-bold text-lg tracking-tight hover:text-primary transition-colors">
              DSA Tracker
            </Link>
            <div className="flex items-center gap-4">
              <Show when="signed-out">
                <SignInButton>
                  <button className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
                    Log in
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-medium text-sm h-9 px-4 transition-all cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mr-2">
                  Dashboard
                </Link>
                <UserButton />
              </Show>
            </div>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
