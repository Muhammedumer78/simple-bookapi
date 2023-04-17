import { NextResponse } from 'next/server';

export async function POST(request:Request) {
  let token = await request.headers.get("authtoken");
  let crypto = require("crypto");
  let orderId = crypto.randomBytes(12).toString("hex");
  try {
    let { clientName, bookId } = await request.json();
    if (
      clientName != null &&
      bookId != null &&
      clientName != "" &&
      bookId != ""
    ) {
      //@ts-ignore
      const sql = postgres(process.env.DATABASE_URL, {
        ssl: require,
      });

      const bookdata = await sql.unsafe(
        `select * from book where id='${bookId}'`
      );

      if (bookdata.length > 0) {
        return NextResponse.json(
          { error: "No Book found" },
          { status: 404 }
        );
      } else {
        const res = await sql.unsafe(
          `insert into orders(id,bookId,customerName,createdBy) values ('${orderId},${bookId}','${clientName}','${token}')`
        );
        return NextResponse.json({ accessToken: token });

      }
    } else {
      return NextResponse.json(
        { error: "ClientName or bookId is not Provided" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Body Isn't Provided" }, { status: 500 });
  }
}
 
