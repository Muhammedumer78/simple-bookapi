
import { NextResponse } from "next/server";
import postgres from 'postgres';



export  async function GET (request:Request){
    const id = request.url.slice(request.url.lastIndexOf('/') + 1);
    const res = await getData('select * from books where id='+id);
    return NextResponse.json(res);
}

async function getData(query: any) {
    //@ts-ignore
    const sql = postgres(process.env.DATABASE_URL, {
      ssl: require,
    });
  
    const result = await sql.unsafe(query);
    return result;
  }
  