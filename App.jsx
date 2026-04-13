import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Context
import { CartProvider } from "./context/CartContext";

// Components
import Navbar from "./components/Navbar"; // no need for .jsx extension

// Pages
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import PaymentPage from "./pages/PaymentPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrdersPage from "./pages/OrdersPage";
import HistoryPage from "./pages/HistoryPage";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
