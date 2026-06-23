import { readFile } from "node:fs/promises";
import path from "node:path";
import postgres from "postgres";

import { loadLocalEnv } from "./load-env";

async function main() {
  loadLocalEnv();

  const databaseUrl =
    process.env.SUPABASE_DATABASE_URL ??
    process.env.DIRECT_URL ??
    process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("SUPABASE_DATABASE_URL, DIRECT_URL, or DATABASE_URL is required to apply the schema.");
  }

  const schemaPath = path.join(process.cwd(), "supabase", "schema.sql");
  const schema = await readFile(schemaPath, "utf8");
  const sql = postgres(databaseUrl, { ssl: "require", max: 1, prepare: false });

  try {
    await sql.unsafe(schema);
    console.log("Schema applied successfully.");
  } finally {
    await sql.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
