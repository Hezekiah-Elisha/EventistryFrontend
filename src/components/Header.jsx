import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function Header() {
  return (
    <div className="p-10 bg-amber-600 flex flex-row justify-between">
      <div>
        <h1 className="text-3xl text-white">Eventistry</h1>
      </div>
      <div className="flex flex-row justify-around align-middle gap-2 text-white">
        <a href="/" className="hover:bg-blue-950 p-2">
          Home
        </a>
        <a href="/about" className="hover:bg-blue-950 p-2">
          About
        </a>
      </div>
      <div className="flex flex-row text-white justify-center align-middle">
        <div className="flex flex-row relative gap-2">
          <ShoppingCartIcon className="size-6 text-white" />
          <sup className="absolute top-0 -right-3 bg-red-600 p-2 rounded-full text-white">
            0
          </sup>
        </div>
        <a href="/signup" className="hover:bg-blue-950 p-2">
          Sign Up
        </a>
        <a href="/signin" className="hover:bg-blue-950 p-2">
          Sign In
        </a>
      </div>
    </div>
  );
}
