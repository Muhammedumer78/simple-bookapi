import { NextResponse } from "next/server";
import postgres from "postgres";

export async function GET(request: Request) {
  let token = await request.headers.get("authorization");

  //@ts-ignore
  const sql = postgres(process.env.DATABASE_URL, {
    ssl: require,
  });

  const token2 = await sql.unsafe(`select * from users where token='${token}'`);
  if (token2.length == 0) {
    return NextResponse.json({ noUser: "+" });
  } else {
    return NextResponse.json({ user: "+" });
  }
}
