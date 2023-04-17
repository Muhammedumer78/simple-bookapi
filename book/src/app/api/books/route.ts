import { NextResponse } from "next/server";
import postgres from "postgres";

export async function GET() {
  //@ts-ignore
  const db = postgres(process.env.DATABASE_URL, {
    ssl: require,
  });

  const result = await db.unsafe("select id,name,author,type from books");
  return NextResponse.json(result);
}
