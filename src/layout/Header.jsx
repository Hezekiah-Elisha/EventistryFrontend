import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="p-5 bg-primary flex flex-row justify-between">
      <Link to="/">
        <h1 className="text-3xl text-white">Eventistry</h1>
      </Link>
      <div className="flex flex-row justify-around align-middle gap-2 text-white">
        <Link to="/" className="hover:bg-blue-950 p-2">
          Home
        </Link>
        <Link to="/about" className="hover:bg-blue-950 p-2">
          About
        </Link>
      </div>
      <div className="flex flex-row text-white justify-center align-middle">
        <div className="flex flex-row relative gap-2">
          <ShoppingCartIcon className="size-6 text-white" />
          <sup className="absolute top-0 -right-3 bg-red-600 p-2 rounded-full text-white">
            0
          </sup>
        </div>
        <Link to="/sign-up" className="hover:bg-blue-950 p-2">
          Sign Up
        </Link>
        <Link to="/sign-in" className="hover:bg-blue-950 p-2">
          Sign In
        </Link>
      </div>
    </div>
  );
}
