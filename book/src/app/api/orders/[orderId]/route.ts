import { NextResponse } from "next/server";
import postgres from "postgres";

export async function GET(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  const orderId = params.orderId;

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




export async function PATCH(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  const orderId = params.orderId;
  
  let token = await request.headers.get("authtoken");
 
  try {
    let { clientName} = await request.json();
    if (
      clientName != null &&
      clientName != "" 
    ) {
      // @ts-ignore
      const sql = postgres(process.env.DATABASE_URL, {
        ssl: require,
      });

      const orders = await sql.unsafe(
        `select * from orders where createdby='${token}' and id='${orderId}'`
      );
      if (orders.length == 0) {
        return NextResponse.json({ error: "No Order Found" }, { status: 404 });
      } else {
        const res = await sql.unsafe(
          `UPDATE orders SET customername = '${clientName}' WHERE createdby='${token}' and id='${orderId}' `
        );
        return NextResponse.json({ success: "order updated" });
      }
    } else {
      return NextResponse.json(
        { error: "ClientName is not Provided" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Body Isn't Provided" }, { status: 500 });
  }
}

