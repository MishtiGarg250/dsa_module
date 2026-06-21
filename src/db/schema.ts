
import {pgTable,uuid, text,timestamp} from "drizzle-orm/pg-core";

export const problems= pgTable("problems",{
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    url: text("url").notNull(),
    platform: text("platform").notNull(),
    difficulty: text("difficulty"),
    status: text("status").default("pending").notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type InsertProblem = typeof problems.$inferInsert;
export type SelectProblem = typeof problems.$inferSelect;


