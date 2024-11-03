import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../../components/SideNav";

export default function DashPage() {
  return (
    <div className="flex flex-row">
      <SideNav />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
