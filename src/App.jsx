import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./layout/Header";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignInpage from "./pages/SignInpage";
import SignupPage from "./pages/SignupPage";
import ProductPage from "./pages/ProductPage";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="sign-in" element={<SignInpage />} />
        <Route path="sign-up" element={<SignupPage />} />
        <Route path="products/:productId" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
  )
}
