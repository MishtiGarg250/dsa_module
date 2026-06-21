import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

// We provide a dummy fallback so the app doesn't crash synchronously on import 
// if the environment variable is missing during deployment. 
// Actual queries will fail and be caught by the try/catch blocks.
const connectionString = process.env.DATABASE_URL || "postgres://dummy:dummy@dummy/dummy";

export const db = drizzle(connectionString);
