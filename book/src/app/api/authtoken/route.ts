import { NextResponse } from "next/server";
import postgres from 'postgres';



export  async function POST(request:Request){
    let crypto = require("crypto");
    let token = crypto.randomBytes(12).toString('hex');
    let {username,useremail}: Partial<any> = await request.json();
    
    if(username!= null && useremail!=null && username!="" && useremail!=""){
        let userdata:any= await getData(`select * from users where useremail='${useremail}'`)
        
    if(userdata.length > 0){
        let obj={
            token:userdata[0].token,
             message1 : "useremail is already registersed, please try with an other email ",
        } 
        console.log(userdata)
        return NextResponse.json(obj);
    }
    else{
        let db = "insert into users(token,username,useremail) values ( '" +
        token +
        "','" +
        username +
        "','" +
        useremail +
        "')"
const res=await getData(db)
console.log(res)
return NextResponse.json(`Token:${token}`);

    }
        return NextResponse.json(userdata);
    }
    else{
        let message2 = "username or useremail is null ";
        return NextResponse.json(message2);
    }
    
}

async function getData(query: any) {
    //@ts-ignore
    const sql = postgres(process.env.DATABASE_URL, {
      ssl: require,
    });
  
    const result = await sql.unsafe(query);
    return result;
  }