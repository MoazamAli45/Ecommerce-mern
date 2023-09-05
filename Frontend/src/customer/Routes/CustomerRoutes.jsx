import { Routes, Route } from "react-router-dom";
import HomePage from "./../pages/HomePage";
import ProductPage from "./../pages/ProductPage";
import CartPage from "./../pages/CartPage";
import ProductDetailPage from "./../pages/ProductDetailPage";
import CheckoutPage from "./../pages/CheckoutPage";
import OrderPage from "./../pages/OrderPage";
import OrderSummaryPage from "./../pages/OrderSummaryPage";
import LoginPage from "./../pages/LoginPage";
import SignupPage from "./../pages/SignupPage";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/:levelOne/:levelTwo/:levelThree"
        element={<ProductPage />}
      />
      <Route path="/product/:productId" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      {/*    For User Account  */}
      <Route path="/account/order" element={<OrderPage />} />
      <Route path="/account/order/:orderId" element={<OrderSummaryPage />} />
    </Routes>
  );
};

export default CustomerRoutes;
