import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import SideNav from "./SideNav";
import DashPage from "../pages/dashboard/DashPage";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  // const location =

  return currentUser ? <DashPage/> : <Navigate to="/" />;
}
