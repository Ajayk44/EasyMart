import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Signup from "../pages/Signup";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Checkout from "../pages/Checkout";
import Cart from "../pages/Cart";
import ProtectedRoute from "./ProtectedRoute";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="signup" element={<Signup />} />
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="login" element={<Login />} />
      <Route
        path="checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route path="cart" element={<Cart />} />
    </Routes>
  );
};

export default Routers;
