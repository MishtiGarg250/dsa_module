import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/src/db";
import { problems } from "@/src/db/schema";
import { detectPlatform, extractLeetcodeSlug } from "@/lib/parser";
import { getLeetcodeProblem } from "@/lib/metadata";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const platform = detectPlatform(url);
    if (platform !== "leetcode") {
      return NextResponse.json({ error: "Only Leetcode is supported currently" }, { status: 400 });
    }

    const slug = extractLeetcodeSlug(url);
    if (!slug) {
      return NextResponse.json({ error: "Invalid Leetcode URL" }, { status: 400 });
    }

    const problem = await getLeetcodeProblem(slug);
    if (!problem || !problem.title) {
      return NextResponse.json({ error: "Could not fetch problem details from LeetCode" }, { status: 400 });
    }

    // Check if the user already added this problem
    const existing = await db
      .select()
      .from(problems)
      .where(and(eq(problems.userId, userId), eq(problems.title, problem.title)))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json({ error: "You have already added this problem." }, { status: 409 });
    }

    const [created] = await db.insert(problems)
      .values({
        userId,
        title: problem.title,
        difficulty: problem.difficulty,
        platform,
        url,
      })
      .returning();

    // Revalidate the dashboard page so the UI updates
    revalidatePath("/dashboard");
    revalidatePath("/");

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error: any) {
    console.error("Failed to add problem via API:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
