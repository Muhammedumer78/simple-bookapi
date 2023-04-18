import React from "react";
import Image from "next/image";
import png from "../../public/img4.png";
import Link from "next/link";
export default function Header() {
  return (
    <div >
      <h1 className="text-center font-sans font-bold text-4xl flex justify-center p-16 underline">
        S I M P L E- B O O K - A P I
      </h1>
      <div>
        <p className="font-serif font-bold px-6 text-2xl">
          Vercel API: https://book-lovat-gamma.vercel.app/
        </p>
        <h2 className="text-3xl font-mono font-bold px-6 py-5">
          End points :
          </h2>
          <div className="text-xl font-bold font-serif p-3">
          <p>1. GET/status (for books status)</p>
          <p> 2. GET/books (all books)</p>
          <p>3. GET/books/:id (for book by id)</p>
          <p>4. GET/api-client (for authorization)</p>
          <p> 5. POST/orders (for placing books order)</p>
          <p> 6. GET/orders (for the books order)</p>
          <p>7. GET/orders/:id (for the order by id)</p>
          <p>8. DELETE/order/:id (for delete)</p>
          <p>9. PATCH/order/:id (for updating)</p>
          </div>
      </div>
    </div>
  );
}
