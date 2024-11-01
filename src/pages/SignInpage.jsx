import React from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function SignInpage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);



  return (
    <div className="flex flex-col justify-center align-middle items-center text-center w-full h-screen">
      <div className="w-5/12">
        <h2 className="text-4xl font-poppins">Welcome back!</h2>
        <h3 className="text-sm">
          Don&apos;t have an account yet? <a href="/signup">Sign Up Now</a>
        </h3>
        <form className="flex flex-col justify-center align-middle gap-2 p-10">
          <input type="Email" placeholder="Email" />
          <div className="flex flex-row justify-between align-middle items-center w-full gap-2 rounded-full border border-slate-300">
            <input type={showPassword ? "text" : "password"} placeholder="Password" className="border-none outline-none" />
            <p onClick={toggleShowPassword} className="pr-10">
              {showPassword ? <EyeSlashIcon className="size-6"/> : <EyeIcon className="size-6" />}
            </p>
          </div>
          <button>Sign In</button>
        </form>
        <div className="flex flex-row justify-between px-10">
          <Link to="/sign-up">Create account</Link>
          <Link to="">Need help?</Link>
        </div>
      </div>
    </div>
  );
}
