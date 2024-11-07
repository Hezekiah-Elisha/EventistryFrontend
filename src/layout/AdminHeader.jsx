import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { instance } from "../api";
import { useEffect, useState } from "react";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";

export default function AdminHeader() {
  const { error, loading } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.access_token}`,
      },
    };
    try {
      const response = instance.delete("/auth/logout", config);
      dispatch(logout());
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 bg-primary flex flex-row justify-between">
      <div>
        <Link to="/">
          <h1 className="text-3xl text-white">Eventistry</h1>
        </Link>
      </div>
      <div className="hidden md:flex flex-row text-white justify-center align-middle">
        <Link to="/sign-up" className="hover:bg-blue-950 p-2">
          Profile
        </Link>
        <div
          className="hover:bg-blue-950 p-2 cursor-pointer"
          onClick={handleLogout}
        >
          Sign Out
        </div>
      </div>
      <button onClick={toggleMenu} className="md:hidden">
        <Bars3BottomRightIcon className="h-6 w-6 text-white" />
      </button>
      {isOpen && (
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden w-full font-montserrat">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-primary dark:bg-rtg_blue divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  {/* <img src={logo} className="h-8" alt="Flowbite Logo" /> */}
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="inline-flex items-center p-2 justify-center text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:text-gray-300 dark:hover:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-sticky"
                    aria-expanded={isOpen}
                    onClick={toggleMenu}
                  >
                    <span className="sr-only">Close main menu</span>
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <nav className="mt-6">
                <div className="grid gap-7">
                  <Link
                    to="/sign-up"
                    className="flex items-center p-3 -m-3 text-lg font-medium text-gray-900 rounded-md hover:bg-white dark:text-gray-100 dark:hover:bg-white hover:text-primary"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/sign-in"
                    className="flex items-center p-3 -m-3 text-lg font-medium text-gray-900 rounded-md hover:bg-white dark:text-gray-100 dark:hover:bg-white hover:text-primary"
                  >
                    Sign Out
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
