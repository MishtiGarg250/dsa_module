"use server"
import {auth} from "@clerk/nextjs/server";
import {db} from "@/src/db";
import {problems} from "@/src/db/schema";
import  {detectPlatform, extractLeetcodeSlug} from "@/lib/parser";
import { getLeetcodeProblem } from "@/lib/metadata";
import {desc,eq} from "drizzle-orm";

export async function addProblem(
    url: string
){
    const {userId} = await auth();
    if(!userId){
        throw new Error("Unauthorized");
    }
    const platform = detectPlatform(url);
    if(platform !== "leetcode"){
        throw new Error(
            "Only Leetcode supported currently"
        );
    }

    const slug = extractLeetcodeSlug(url);
    if(!slug){
        throw new Error("Invalid Leetcode URL");
    }
    const problem = await getLeetcodeProblem(slug);
    const [created] = await db.insert(problems)
    .values({
        userId,
        title:problem.title,
        difficulty: problem.difficulty,
        platform,
        url,
    })
    .returning();

    return created;
}

export async function getProblems(){
    const {userId} = await auth();
    if(!userId) return [];
    return db
          .select()
          .from(problems)
          .where(
            eq(
                problems.userId,
                userId
            )
          )
          .orderBy(
            desc(problems.createdAt)
          )
}