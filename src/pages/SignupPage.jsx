import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { instance } from "../api";
import { useDispatch, useSelector } from "react-redux";
import {
  signupStart,
  signupSuccess,
  signupFailure,
} from "../redux/user/userSlice";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { error, loading } = useSelector((state) => state.user);
  const [localError, setLocalError] = useState("");

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setLocalError;
    }
  }, [error]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(signupStart());
      const response = await instance.post("/auth/register", formData);
      dispatch(signupSuccess(response.data));
      navigate("/sign-in");
    } catch (error) {
      console.error(error);
      dispatch(signupFailure(error));
    }
  };

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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center align-middle gap-2 p-10"
        >
          <input
            type="Email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <div className="flex flex-row justify-between align-middle items-center w-full gap-2 rounded-full border border-slate-300">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border-none outline-none"
              name="password"
              onChange={handleChange}
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
          <p className="text-red-500">{localError}</p>
          {loading ? (
            <button className="flex animate-pulse bg-slate-400">
              <div className="text-center w-full">
                <span>Signing up</span>
              </div>
            </button>
          ) : (
            <button>Sign Up</button>
          )}
          {error && (
            <div className="error text-red-800">
              {error.email &&
                error.email.map((msg, index) => <p key={index}>{msg}</p>)}
              {error.error && <p>{error.error}</p>}
            </div>
          )}
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
