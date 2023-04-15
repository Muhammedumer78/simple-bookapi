import { NextResponse } from "next/server";
import postgres from 'postgres';

export  async function Status(query:any){    
    return NextResponse.json("avaliable");
}


export  async function GET(query:any){
    const res = await getData('select * from books');
    return NextResponse.json(res);
}

export  async function GETbyID (query:any){
    const res = await getData('select * from books');
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
  