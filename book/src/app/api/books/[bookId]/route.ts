import { NextResponse } from "next/server";
import postgres from "postgres";

export async function GET(
  request: Request,
  { params }: { params: { bookId: string } }
) {
  const id = params.bookId;

  //@ts-ignore
  const sql = postgres(process.env.DATABASE_URL, {
    ssl: require,
  });

  const result = await sql.unsafe(`select * from books where id='${id}'`);
  if (result.length == 0) {
    return NextResponse.json({ error: "No Book Found" }, { status: 404 });
  } else {
    return NextResponse.json(result);
  }
}
