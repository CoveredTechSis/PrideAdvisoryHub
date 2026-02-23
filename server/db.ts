import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@shared/schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Please provide your Supabase connection string in environment variables.");
}

const client = postgres(connectionString);
export const db = drizzle(client, { schema });
