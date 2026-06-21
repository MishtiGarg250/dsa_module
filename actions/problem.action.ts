"use server"
import { auth } from "@clerk/nextjs/server";
import { db } from "@/src/db";
import { problems } from "@/src/db/schema";
import { detectPlatform, extractLeetcodeSlug } from "@/lib/parser";
import { getLeetcodeProblem } from "@/lib/metadata";
import { desc, eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addProblem(url: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }
    const platform = detectPlatform(url);
    if (platform !== "leetcode") {
      return { success: false, error: "Only Leetcode supported currently" };
    }

    const slug = extractLeetcodeSlug(url);
    if (!slug) {
      return { success: false, error: "Invalid Leetcode URL" };
    }
    const problem = await getLeetcodeProblem(slug);
    if (!problem || !problem.title) {
      return { success: false, error: "Could not fetch problem details from LeetCode" };
    }

    // Check if the user already added this problem
    const existing = await db
      .select()
      .from(problems)
      .where(and(eq(problems.userId, userId), eq(problems.title, problem.title)))
      .limit(1);

    if (existing.length > 0) {
      return { success: false, error: "You have already added this problem." };
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

    revalidatePath("/");
    return { success: true, data: created };
  } catch (error: any) {
    console.error("Failed to add problem:", error);
    return { success: false, error: error.message || "An unexpected error occurred." };
  }
}

export async function getProblems() {
  try {
    const { userId } = await auth();
    if (!userId) return [];
    
    // Test the connection variable directly if needed, but the try/catch protects the SSR
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL is not set.");
      return [];
    }

    return await db
      .select()
      .from(problems)
      .where(eq(problems.userId, userId))
      .orderBy(desc(problems.createdAt));
  } catch (error) {
    console.error("Failed to fetch problems during SSR:", error);
    return []; // Return empty array to prevent complete SSR crash
  }
}

export async function toggleProblemStatus(
  problemId: string,
  currentStatus: string,
) {
  try {
    const nextStatus = currentStatus === "solved" ? "pending" : "solved";
    await db
      .update(problems)
      .set({
        status: nextStatus,
        completedAt: nextStatus === "solved" ? new Date() : null,
      })
      .where(eq(problems.id, problemId));
      
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to toggle status:", error);
    throw error;
  }
}

export async function updateProblemNotes(
  problemId: string,
  notes: string,
) {
  try {
    await db
      .update(problems)
      .set({
        notes,
      })
      .where(eq(problems.id, problemId));
      
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to update notes:", error);
    throw error;
  }
}