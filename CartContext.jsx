// src/context/CartContext.jsx
import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    setHistory((prevHistory) => [
      ...prevHistory,
      { ...product, date: new Date() }
    ]);
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, history, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
