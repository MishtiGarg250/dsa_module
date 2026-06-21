import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    // 1. Check if the env variable is actually set in the environment
    const rawUrl = process.env.DATABASE_URL;
    const isUrlSet = !!rawUrl;
    
    let sslRequired = false;
    if (isUrlSet && rawUrl?.includes("sslmode=require")) {
      sslRequired = true;
    }

    // 2. Test the raw connection (this doesn't rely on the 'problems' table existing)
    const result = await db.execute(sql`SELECT 1 as is_connected`);
    
    // 3. If we get here, the connection works! Now check if the 'problems' table exists
    const tableCheck = await db.execute(sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'problems'
      );
    `);

    return NextResponse.json({ 
      success: true, 
      diagnostics: {
        databaseUrlSet: isUrlSet,
        hasSslMode: sslRequired,
        connectionSuccessful: true,
        problemsTableExists: tableCheck.rows[0]?.exists || false
      }
    });

  } catch (error: any) {
    // Connection failed completely
    return NextResponse.json({
      success: false,
      error: error.message,
      diagnostics: {
        databaseUrlSet: !!process.env.DATABASE_URL,
        hasSslMode: process.env.DATABASE_URL?.includes("sslmode=require") || false,
        connectionSuccessful: false,
        problemsTableExists: "Unknown (could not connect)"
      }
    }, { status: 500 });
  }
}
