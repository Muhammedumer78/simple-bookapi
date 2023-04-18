import { NextResponse } from "next/server";
import postgres from "postgres";

export async function GET(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  const orderId = params.orderId;
  console.log(orderId);
  //@ts-ignore
  const sql = postgres(process.env.DATABASE_URL, {
    ssl: require,
  });
  let token = await request.headers.get("authtoken");
  const orders = await sql.unsafe(
    `select * from orders where createdby='${token}' and id='${orderId}'`
  );
  if (orders.length == 0) {
    return NextResponse.json({ error: "No Order exist" }, { status: 404 });
  } else {
    return NextResponse.json(orders);
  }
}


export async function DELETE(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  const orderId = params.orderId;
  console.log(orderId);
  //@ts-ignore
  const sql = postgres(process.env.DATABASE_URL, {
    ssl: require,
  });
  let token = await request.headers.get("authtoken");
  const orders = await sql.unsafe(
    `delete from orders where createdby='${token}' and id='${orderId}'`
  );
    return NextResponse.json({ success: "Order Deleted" }, { status: 201 });
}