import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className="grid h-screen place-content-center bg-secondary px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>

        <p className="text-2xl font-bold tracking-tight text-primary sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">We can't find that page.</p>

        <Link href={"/"}>
          <Button className="mt-5">Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
