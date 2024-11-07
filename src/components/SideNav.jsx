import { useLocation } from "react-router-dom";

export default function SideNav() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col gap-2 bg-white h-screen shadow-xl">
      <div className="w-full px-4">
        <ul className="flex flex-col justify-center align-middle gap-3 text-black py-2 w-full">
          {isActive("/dashboard") ? (
            <li className="bg-secondary rounded-lg text-white hover:bg-primary px-10  py-2">
              <a href="/dashboard">Dashboard</a>
            </li>
          ) : (
            <li className="hover:bg-secondary rounded-lg hover:text-white px-10  py-2">
              <a href="/dashboard">Dashboard</a>
            </li>
          )}
          {isActive("/dashboard/profile") ? (
            <li className="bg-secondary rounded-lg text-white hover:bg-primary px-10  py-2">
              <a href="/dashboard/profile">Profile</a>
            </li>
          ) : (
            <li className="hover:bg-secondary rounded-lg hover:text-white px-10  py-2">
              <a href="/dashboard/profile">Profile</a>
            </li>
          )}
          {isActive("/dashboard/settings") ? (
            <li className="bg-secondary rounded-lg text-white hover:bg-primary px-10  py-2">
              <a href="/dashboard/settings">Settings</a>
            </li>
          ) : (
            <li className="hover:bg-secondary rounded-lg hover:text-white px-10  py-2">
              <a href="/dashboard/settings">Settings</a>
            </li>
          )}
          {isActive("/dashboard/products") ? (
            <li className="bg-secondary rounded-lg text-white hover:bg-primary px-10  py-2">
              <a href="/dashboard/products">Products</a>
            </li>
          ) : (
            <li className="hover:bg-secondary rounded-lg hover:text-white px-10  py-2">
              <a href="/dashboard/products">Products</a>
            </li>
          )}
          {isActive("/dashboard/categories") ? (
            <li className="bg-secondary rounded-lg text-white hover:bg-primary px-10  py-2">
              <a href="/dashboard/categories">Categories</a>
            </li>
          ) : (
            <li className="hover:bg-secondary rounded-lg hover:text-white px-10  py-2">
              <a href="/dashboard/categories">categories</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
