import { useState } from "react";
import { Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="flex flex-col justify-center align-middle items-center text-center w-full h-screen">
      <div className="w-5/12">
        <h2 className="text-4xl font-poppins">Thank you for joining us</h2>
        <h3 className="text-sm">
          <span>Already have an account?</span>
          <Link to="/sign-in" className="text-blue-900 underline">
            Sign In
          </Link>
        </h3>
        <form className="flex flex-col justify-center align-middle gap-2 p-10">
          <input type="Email" placeholder="Email" />
          <div className="flex flex-row justify-between align-middle items-center w-full gap-2 rounded-full border border-slate-300">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border-none outline-none"
            />
            <p onClick={toggleShowPassword} className="pr-10">
              {showPassword ? (
                <EyeSlashIcon className="size-6" />
              ) : (
                <EyeIcon className="size-6" />
              )}
            </p>
          </div>
          <div className="flex flex-row justify-between align-middle items-center w-full gap-2 rounded-full border border-slate-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="border-none outline-none"
            />
            <p onClick={toggleShowConfirmPassword} className="pr-10">
              {showConfirmPassword ? (
                <EyeSlashIcon className="size-6" />
              ) : (
                <EyeIcon className="size-6" />
              )}
            </p>
          </div>
          <button>Sign Up</button>
          <button className="flex animate-pulse bg-slate-400">
            <div className="">
              <span>Signing up</span>
            </div>
          </button>
        </form>
        <div className="flex flex-row justify-between px-10">
          <Link to="/sign-up" className="text-blue-900 underline">
            Create account
          </Link>
          <Link to="" className="text-blue-900 underline">
            Need help?
          </Link>
        </div>
      </div>
    </div>
  );
}
