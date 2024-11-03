import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../api";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SignInpage() {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      dispatch(loginStart());
      const response = await instance.post("/auth/login", formData);
      dispatch(loginSuccess(response.data));
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    
      dispatch(loginFailure(error));
    }
  };

  return (
    <div className="flex flex-col justify-center align-middle items-center text-center w-full h-screen">
      <div className="w-5/12">
        <h2 className="text-4xl font-poppins">Welcome back!</h2>
        <h3 className="text-sm">
          Don&apos;t have an account yet? <a href="/signup">Sign Up Now</a>
        </h3>
        <form
          className="flex flex-col justify-center align-middle gap-2 p-10"
          onSubmit={handleSubmit}
        >
          <input type="Email" placeholder="Email" name="email" onChange={handleChange} />
          <div className="flex flex-row justify-between align-middle items-center w-full gap-2 rounded-full border border-slate-300">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border-none outline-none"
              onChange={handleChange}
              name="password"
            />
            <p onClick={toggleShowPassword} className="pr-10">
              {showPassword ? (
                <EyeSlashIcon className="size-6" />
              ) : (
                <EyeIcon className="size-6" />
              )}
            </p>
          </div>
          {loading ? (
            <button className="flex animate-pulse bg-slate-400">
              <div className="text-center w-full">
                <span>Signing In</span>
              </div>
            </button>
          ) : (
            <button>Sign In</button>
          )}
          {error.response && (
            <div className="error text-red-800">
              {error.response.data.message && <p>{error.response.data.message}</p>}              {error.error && <p>{error.error}</p>}
            </div>
          )}
        </form>
        <div className="flex flex-row justify-between px-10">
          <Link to="/sign-up">Create account</Link>
          <Link to="">Need help?</Link>
        </div>
      </div>
    </div>
  );
}
