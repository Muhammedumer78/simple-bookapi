import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export async function POST(request: NextRequest) {
  let crypto = require("crypto");
  let token = crypto.randomBytes(12).toString("hex");
  try {
    let { username, useremail } = await request.json();
    if (
      username != null &&
      useremail != null &&
      username != "" &&
      useremail != ""
    ) {
      //@ts-ignore
      const sql = postgres(process.env.DATABASE_URL, {
        ssl: require,
      });

      const userdata = await sql.unsafe(
        `select * from users where useremail='${useremail}'`
      );

      if (userdata.length > 0) {
        return NextResponse.json(
          { error: "user is already registered" },
          { status: 500 }
        );
      } else {
        const res = await sql.unsafe(
          `insert into users(token,username,useremail) values ('${token}','${username}','${useremail}')`
        );
        return NextResponse.json({ accessToken: token });

      }
    } else {
      return NextResponse.json(
        { error: "ClientName or Email is not Provided" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Body Isn't Provided" }, { status: 500 });
  }
}
