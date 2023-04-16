import React from 'react'
import Image from 'next/image'
import png from "../../public/img4.png";
import Link from 'next/link';
export default function Header() {
  return (
    <div>
      <div className='w-full h-50 flex flex-row'>
        <Image src={png} alt="books" className='h-50 w-60'></Image>
       
        <Link className='font-serif mt-16 ml-24 cursor-pointer hover:underline  text-2xl' href='http://localhost:3000/api/books'>F I C T I O N</Link>
        
        <Link className='font-serif mt-16 ml-24 cursor-pointer hover:underline  text-2xl' href='http://localhost:3000/api/books'>N O N   F I C T I O N</Link>
        
        <Link className='font-serif mt-16 ml-24 cursor-pointer hover:underline  text-2xl' href='http://localhost:3000/api/books'>I R</Link>
      </div>
    
    </div>
  )
}
