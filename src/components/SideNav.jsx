import { useLocation } from "react-router-dom";

export default function SideNav() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <div className="flex flex-col gap-2 w-2/12 bg-primary h-screen">
      <div>Dashboard</div>
      <div className="w-full px-4">
        <ul className="flex flex-col justify-center align-middle gap-3 text-white">
          {isActive("/dashboard") ? (
            <li className=" bg-secondary hover:bg-white hover:text-black px-10  py-2">
              <a href="/dashboard">Dashboard</a>
            </li>
          ) : (
            <li className="px-10  py-2">
              <a href="/dashboard">Dashboard</a>
            </li>
          )}
          {isActive("/dashboard/profile") ? (
            <li className="bg-secondary hover:bg-white hover:text-black px-10  py-2">
              <a href="/dashboard/profile">Profile</a>
            </li>
          ) : (
            <li className="px-10  py-2">
              <a href="/dashboard/profile">Profile</a>
            </li>
          )}
            {isActive("/dashboard/settings") ? (
                <li className="bg-secondary hover:bg-white hover:text-black px-10  py-2">
                <a href="/dashboard/settings">Settings</a>
                </li>
            ) : (
                <li className="px-10  py-2">
                <a href="/dashboard/settings">Settings</a>
                </li>
            )}
        </ul>
      </div>
    </div>
  );
}
