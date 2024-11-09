import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../layout/Header";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import SignInpage from "../pages/SignInpage";
import SignupPage from "../pages/SignupPage";
import ProductPage from "../pages/ProductPage";
import NotFoundPage from "../pages/NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import DashboardProfile from "../pages/dashboard/DashboardProfile";
import DashboardSettings from "../pages/dashboard/DashboardSettings";
import Footer from "../layout/Footer";
import { useSelector } from "react-redux";
import AdminHeader from "../layout/AdminHeader";
import DashboardCategory from "../pages/dashboard/DashboardCategory";
import DashboardProduct from "../pages/dashboard/DashboardProduct";
import DashboardProductItem from "../pages/dashboard/DashboardProductItem";

export default function MainComponent() {
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser && currentUser.user;

  return (
    <BrowserRouter>
      {user ? <AdminHeader /> : <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="sign-in" element={<SignInpage />} />
        <Route path="sign-up" element={<SignupPage />} />
        <Route path="products/:productId" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />

        <Route path="dashboard" element={<PrivateRoute />}>
            <Route index element={<DashboardIndex />} />
            <Route path="profile" element={<DashboardProfile />} />
            <Route path="settings" element={<DashboardSettings />} />
            <Route path="categories" element={<DashboardCategory />} />
            <Route path="products" element={<DashboardProduct />} />
            <Route path="products/:productId" element={<DashboardProductItem />} />
          </Route>
      </Routes>
      {user ? <div></div> : <Footer />}
    </BrowserRouter>
  );
}
