import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import SideNav from "./SideNav";
// import DashPage from "../pages/dashboard/DashPage";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  // const location =

  return currentUser ? (
    <div className="flex flex-row">
      <SideNav />
      <div className="p-3 w-full">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}
