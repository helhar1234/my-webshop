import React from "react";
import LogRocket from 'logrocket';
LogRocket.init('bxyh30/webshop-logs');
LogRocket.identify('1', {
  name: 'Helene Harrer responsive',
  email: 'if22b036@technikum-wien.at',
});

import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { CheckoutProvider } from "./context/CheckoutContext";
import { ScrollToTop } from "./context/ScrollToTop";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import CheckoutOverview from "./pages/CheckoutOverview";
import CheckoutAddress from "./pages/CheckoutAddress";
import CheckoutPayment from "./pages/CheckoutPayment";
import CheckoutSummary from "./pages/CheckoutSummary";

import "./styles/shared/_global.css";

function App() {
  const designMode = "responsive";


  return (
    <div className={designMode}>
      <AuthProvider>
        <CartProvider>
          <CheckoutProvider>
            <Navbar />
            <ScrollToTop />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout/overview" element={<CheckoutOverview />} />
              <Route path="/checkout/address" element={<CheckoutAddress />} />
              <Route path="/checkout/payment" element={<CheckoutPayment />} />
              <Route path="/checkout/summary" element={<CheckoutSummary />} />
            </Routes>
            <Footer />
          </CheckoutProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
